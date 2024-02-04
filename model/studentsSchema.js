const mongoose = require('mongoose');

const studentsSchema = mongoose.Schema({
    Name: String,
    Roll: String,
    DOB: String,
    Age: Number


});

module.exports = studentsSchema;