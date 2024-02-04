const Student = require('../model/studentsModel');

const getStudents = async (req, res) => {
    try {
        const allStudents = await Student.find().exec();

        if (allStudents.length === 0) {
            // Use res.status() and res.json() to send JSON responses
            res.status(404).json({ "message": "no data available" });
        } else {
            res.status(200).json(allStudents);
        }
    } catch (err) {
        console.log(err);
        // Handle the error and send an appropriate response
        res.status(500).json({ "message": "Internal Server Error" });
    }
};

const addStudent = async (req, res) => {
    try {
        const newStudent = new Student({
            Name: req.body.name,
            Roll: req.body.roll,
            DOB: req.body.dob,
            Age: req.body.age
        })
        await newStudent.save();
        res.status(200).json({ "message": "new student added successfully" });
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ "message": "Internal Server Error: Unable to add student" });
    }
}

const getIndividualStudent = async (req, res) => {
    const id = req.params.id;
    try {
        const student = await Student.findById(id);
        res.status(200).json(student);
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ "message": "Internal Server Error" });
    }
}

const deleteStudent = async (req, res) => {
    const id = req.params.id;
    try {
        await Student.findByIdAndDelete(id);
        res.status(200).json({ "message": `successfully deleted item with id ${id}` });
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ "message": "Internal Server Error" });
    }
}

const replaceStudent = async (req, res) => {
    const id = req.params.id;
    try {
        const replacedStudent = await Student.findOneAndReplace(
            { _id: id }, // Query condition
            {
                Name: req.body.name,
                Roll: req.body.roll,
                DOB: req.body.dob,
                Age: req.body.age
            },
            { new: true } // Option to return the replaced document
        );
        if (replacedStudent) {
            res.status(200).json({ "message": "Student replaced successfully", "replacedStudent": replacedStudent });
        }
        else {
            res.status(404).json({ "message": "Student not found or no changes were made" });
        }
    }
    catch (err) {
        console.log(err.message)
        res.status(500).json({ "message": "Internal Server Error" });
    }
}

const updateStudent = async (req, res) => {
    const id = req.params.id;
    try {
        await Student.findOneAndUpdate({ _id: id }, {
            Name: req.body.name,
            Roll: req.body.roll,
            DOB: req.body.dob,
            Age: req.body.age
        })
        res.status(200).json({ "message": `successfully update entry with id ${id}` })
    }
    catch (err) {
        res.status(500).json({ 'message': 'internal server error' })
    }
}

module.exports = {
    getStudents,
    addStudent,
    getIndividualStudent,
    deleteStudent,
    replaceStudent,
    updateStudent
};
