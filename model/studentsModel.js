const mongoose = require('mongoose');

const studentsSchema = mongoose.Schema({
    Name: String,
    Roll: String,
    DOB: String,
    Age: Number


});

const Student = mongoose.model("Student", studentsSchema);

module.exports = Student;