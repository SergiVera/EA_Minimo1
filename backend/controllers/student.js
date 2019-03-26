'user strict';

const mongoose = require('mongoose');
const Student = require('../models/student');

/**
 * Add student to Students collection
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
async function postStudent(req, res) {
    const student = new Student(req.body);
    student._id = new mongoose.Types.ObjectId();

    console.log(student);

    try {
        await student.save();
        res.status(200).send({message: "Student created successfully"})
    } catch (err) {
        res.status(500).send(err);
        console.log(err);
    }
}

module.exports = {
    postStudent
}
