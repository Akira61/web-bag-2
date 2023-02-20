
const mongoose = require("mongoose");

const schema = new mongoose.Schema({
    name: String,
    member_ship : String,
    Phone_Number : String,
    Email : String,
    Bill : String,
    Date : Date,
});


module.exports = mongoose.model("order", schema);