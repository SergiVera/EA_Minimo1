'user strict';

const mongoose = require('mongoose');
const Student = require('../models/student');
const Subject = require('../models/subject');

/**
 * Add new Subject to the subject collection
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
async function postSubject(req, res) {
    const subject = new Subject();
    subject._id = new mongoose.Types.ObjectId();
    subject.name = req.body.name;

    console.log(subject);

    try {
        await subject.save();
        res.status(200).send({message: "Subject created successfully"})
    } catch (err) {
        res.status(500).send(err);
        console.log(err);
    }
}

/**
 * Get all the subjects
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
async function getSubjects(req, res) {
    try {
        let users = await Subject.find();
        res.status(200).send(users);
    } catch(err) {
        res.status(500).send(err)
    }
}

/**
 * Get the details of a specific subject given its id
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
async function getSubjectDetail(req, res) {
    try {
        const _id = req.params.subjectId;

        let subject = await Subject.findById(_id);
        if(!subject){
            return res.status(404).send({message: 'Subject not found'})
        }else{
            res.status(200).send(subject)
        }
    } catch(err) {
        res.status(500).send(err)
    }
}

/**
 * Add student to a subject, only if this student has not been added previously
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
async function postUserSubject(req, res) {
    try{
        const subjectId = req.body.subjectId;
        const studentId = req.body.studentId;

        console.log(`SubjectID: ${subjectId}, StudentID: ${studentId}`);

        let studentFound = await Student.findById(studentId);

        if (!studentFound) {
            return res.status(404).send({message: 'Student not found'})
        } else {
            let subjectUpdated = await Subject.findOneAndUpdate({_id: subjectId}, {$addToSet: {student: studentId}});
            if (!subjectUpdated) {
                return res.status(404).send({message: 'Subject not found'})
            }
        }
        res.status(200).send({message: "Student added successfully to the subject"})
    } catch(err) {
        if (err.name === 'MongoError' && err.code === 11000) {
            res.status(409).send({err: err.message, code: err.code})
        }
        res.status(500).send(err)
    }
}

module.exports = {
    postSubject,
    getSubjects,
    getSubjectDetail,
    postUserSubject
}
