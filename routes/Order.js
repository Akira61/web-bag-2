require("dotenv").config();
const order = require("../database/model_1");
const axios = require("axios")
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
                        service: process.env.hostService,
                        auth : {
                            user : process.env.hostEmail,
                            pass : process.env.hostEmailPassword,
                        }
                    });

                    // message subject
                    const email = {
                        from: process.env.hostEmail,
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

    fastify.get("/verificationEmail/:orderId",async (req, res) => {
        const id = req.params.orderId;
        console.log("order id: ",id);
        const exitesUser = await order.unverifiedClient.findById(id)
        
        console.log("-", exitesUser.user)
        if(exitesUser){
            console.log("order exiests");
           const verifiedUser =new order.verifiedClient(exitesUser.user);
           await verifiedUser.save();
           exitesUser.remove();

           console.log("document removed");
           res.send(`تم اكمال الطلب بينجاح و رقم الفاتورة هو `+ "\n"+ `رقم الفاتورة : ${exitesUser.user.Bill}`+ "\n"+ `سويف يتم التواصل معك في اقرب وقت و تحديد موعد الاجتماع عن طريق تطبيق  zoom`)

           // send to discord message contains order details
            discordHook(
                exitesUser.user.name,
                exitesUser.user.Email,
                exitesUser.user.Phone_Number,
                exitesUser.user.member_ship,
                exitesUser.user.Bill,
                exitesUser.user.Date,
                process.env.discordOrderHook
            )

        }

       })
    
}






// function for sending discord hook contains order details
function discordHook(name, email, phone_number= null, membership=null, bill=null,date ,env){
    
    let params = {
        username: "web bag contact",
        
        content: "",
        embeds: [
          {
            title: "new order",
            color: 15258703,
            thumbnail: {
              url: "https://i.pinimg.com/originals/fc/9f/19/fc9f191914dc0e9ec0bbb054a9a15257.jpg",
            },
            fields: [
                {
                    name : "name : ",
                    value: name,
                    inline: false,
                },
                {
                    name : "email : ",
                    value: email,
                    inline: false,
                },
                {
                    name : "phone number : ",
                    value: phone_number,
                    inline: false,
                },
                {
                    name : "membership : ",
                    value: membership,
                    inline: false,
                },
                {
                    name : "bill : ",
                    value: bill,
                    inline: false,
                },
                {
                    name : "Date : ",
                    value: date,
                    inline: false,
                },
                {
                    name: "mention:",
                    value:'\n\n' + "@here",
                    inline: true,
                  },
            ],
          },
        ],
      };
      
        axios.post(env, params);
      
}




module.exports = Order;