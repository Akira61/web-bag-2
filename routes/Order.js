const order = require("../database/model_1");
const mongoose = require("mongoose");

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
       const newOrder = new order({Date: Date.now(), name: nameXSS, member_ship : membershipXSS, Phone_Number: phoneXSS, Email: emailXSS,Bill:(Math.floor(Math.random() * 1000) + 1000).toString()});
    
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
               newOrder.save();
               
               //send message to client that info is valid
               res.send(`تم أكمال العملية بنجاح,الرجاء حفظ رقم فاتورتك : ${newOrder.Bill}`);
               return;
           }
       }
       
    
       // return funny message for attacker if member ship doesn't works
       res.send("message : sorry honey xss attacks doesn't works :(")
    })
    
}


module.exports = Order;