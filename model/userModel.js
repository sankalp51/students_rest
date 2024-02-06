const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    Email: {
        type: String,
        required: true
    },
    Password: {
        type: String,
        required: true
    },
    RegisterDate: {
        type: String,
        required: true
    }


});

const User = mongoose.model("Users", userSchema);

module.exports = User;