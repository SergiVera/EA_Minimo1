'use strict'

const express = require('express')
const dishCtrl = require('../controllers/dish')
const userCtrl = require('../controllers/user')
const multer = require('multer')
const upload = multer({dest: 'uploads/'})
const auth = require('../middlewares/auth')
const api = express.Router()

//RUTAS API (GET, POST, PUT, DELETE)
api.get('/product', dishCtrl.getDishs)
api.get('/product/:productId', dishCtrl.getDish)
api.post('/product', dishCtrl.saveDish)
api.put('/product/:productId', auth, dishCtrl.updateDish)
api.delete('/product/:productId', auth, dishCtrl.deleteDish)
api.post('/users/signup',userCtrl.signUp)
api.post('/users/signin', userCtrl.signIn)
api.get('/users',userCtrl.getUsers)
api.get('/users/:userId', userCtrl.getSingleUser)
api.delete('/users/:userId', userCtrl.deleteUser)
api.put('/users/:userId', userCtrl.updateUser)
api.get('/private', auth, (req, res) => {
    res.status(200).send({ message: 'Tienes acceso' })
})

module.exports = api
