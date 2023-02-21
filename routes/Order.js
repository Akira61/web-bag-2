require("dotenv").config();
const order = require("../database/model_1");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");

async function Order(fastify, route){
    
    fastify.post("/new-order", (req, res) => {
        const {name: reqName} = req.body;
        const {phone: reqPhone} = req.body;
        const {email: reqEmail} = req.body;
        const {membership: reqMembership} = req.body;
        console.log("@".repeat(40), req.body, reqMembership);
       
        
        // regex to check if phone and email valid
        const phoneNumRegex = /\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}/g;
        const emailRegex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    
        // regex to remove javascript tags to prevent xss attack
        const nameXSS = reqName.replace(/<[^>]+>/g, "<dogTag>");
        const phoneXSS = reqPhone.replace(/<[^>]+>/g, "<dogTag>");
        const emailXSS = reqEmail.replace(/<[^>]+>/g, "<dogTag>");
       const membershipXSS =  reqMembership.replace(/<[^>]+>/g, "<dogTag>");
    

       //create order but not saving it yet
       const payload = {user : {Date: Date.now(), name: nameXSS, member_ship : membershipXSS, Phone_Number: phoneXSS, Email: emailXSS,Bill:(Math.floor(Math.random() * 1000) + 1000).toString()}}
       const newOrder = new order.unverifiedClient(payload);
    
       if(!phoneNumRegex.test(reqPhone)){
        return res.send("الرقم غير صحيح, الرجاء كتابت الرقم بشكل صحيح");
       }
       else if(!emailRegex.test(reqEmail)){
        return res.send("البريد الالكتروني غير صحيح, الرجاء كتابت البريد الالكتروني بشكل صحيح");
       }
       
       //check if member ship is in the list or not
       const memberShipsList = ["بيسك", "برو" ,"موصى به"];

       for(let i=0; i < memberShipsList.length; i++){

           if(memberShipsList[i] == reqMembership){
                newOrder.save()
                
                    const verificationURL = `${req.headers.origin}/verification-email/${newOrder.id}`;
                    console.log("^url^".repeat(20),verificationURL);

                    //host email info
                    const hostEmail = nodemailer.createTransport({
                        service: "outlook",
                        auth : {
                            user : "fahad.61@outlook.com",
                            pass : "F4a1H6a1D3.961",
                        }
                    });

                    // message subject
                    const email = {
                        from: "fahad.61@outlook.com",
                        to : emailXSS,
                        subject : `${nameXSS} أكيد طلبك`,
                        html : `<h3> الرجاء فتح الرابط لي تأكيد طلبك ${nameXSS}</h3> <br/> <h5><a href='${verificationURL}'>الرابط</a></h5>`
                    }

                    //send the email
                    hostEmail.sendMail(email, (err, info) => {
                        if (err) throw err;
                        console.log("!!!!Email sent : ", info)
                    })

                res.send(newOrder.id);
                
               
               //send message to client that info is valid
            //    res.send(`تم أكمال العملية بنجاح,الرجاء حفظ رقم فاتورتك : ${newOrder.Bill}`)
               
           } 
       }
       // return funny message for attacker if member ship doesn't works
       res.send("message : sorry honey xss attacks doesn't works :(")
    });

    fastify.get("/verificationEmail/:token",async (req, res) => {
        const token ="63f46fb9d8f3fa0fc158cafb";
        
        const exitesUser =await order.unverifiedClient.findById(token)
        
        console.log("-", exitesUser.user)
        if(exitesUser){
           const verifiedUser =new order.verifiedClient(exitesUser.user);
           await verifiedUser.save();
           exitesUser.remove();
           console.log("document removed");
        }else{
            res.send("تم الغاء التحقق لي تجاوز الوقت المطلوب،الرجاء اعادة محاولة الكلب من جديد")
        }
       })
    
}


module.exports = Order;