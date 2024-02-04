const express = require('express');
const router = express.Router();
const students = require('../../controller/studentsController');

router.get('/all-students', students.getStudents);
router.post('/add-student', students.addStudent);
router.get('/:id', students.getIndividualStudent);
router.delete('/delete/:id', students.deleteStudent);
router.put('/replace-student/:id', students.replaceStudent);
router.patch('/update-student/:id', students.updateStudent)


module.exports = router;