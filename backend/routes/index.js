'use strict';

const express = require('express');
const studentCtrl = require('../controllers/student');
const subjectCtrl = require('../controllers/subject');
const api = express.Router();

/**
 * Routes restful API
 */
api.get('/subjects', subjectCtrl.getSubjects);
api.post('/subjects/adduser', subjectCtrl.postUserSubject);
api.post('/subjects', subjectCtrl.postSubject);
api.get('/subjects/:subjectId', subjectCtrl.getSubjectDetail);
api.post('/students', studentCtrl.postStudent);

/*api.put('/product/:productId', auth, dishCtrl.updateDish)
api.delete('/product/:productId', auth, dishCtrl.deleteDish)
api.post('/users/signup',userCtrl.signUp)
api.post('/users/signin', userCtrl.signIn)
api.get('/users',userCtrl.getUsers)
api.delete('/users/:userId', userCtrl.deleteUser)
api.put('/users/:userId', userCtrl.updateUser)
api.get('/private', auth, (req, res) => {
    res.status(200).send({ message: 'Tienes acceso' })
})*/

module.exports = api;
