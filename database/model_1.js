
const mongoose = require("mongoose");

const verifiedClient = new mongoose.Schema({
    name: String,
    member_ship : String,
    Phone_Number : String,
    Email : String,
    Bill : String,
    Date : Date,
});

const unverifiedClient = new mongoose.Schema({
    user : {
        name: String,
        member_ship : String,
        Phone_Number : String,
        Email : String,
        Bill : String,
        Date : Date,
    },
    verifyDate : {
        type: Date,
        default: Date.now,
        expires: '10m',
    }
});
module.exports.verifiedClient = mongoose.model("order", verifiedClient);
module.exports.unverifiedClient = mongoose.model("unverified_client", unverifiedClient)