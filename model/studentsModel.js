const mongoose = require('mongoose');
const studentsSchema = require('./studentsSchema');

const Student = mongoose.model("Student", studentsSchema);

module.exports = Student;