const mongoose = require("mongoose");
const md5 = require('md5');

const userSchema = new mongoose.Schema ({
    email: String,
    password: String
});



const User = new mongoose.model("User", userSchema);

module.exports = User;