'user strict'

const mongoose = require('mongoose')
const User = require('../models/user')
const service = require('../services')

async function signUp(req, res) {
    const user = new User(req.body)
    user._id = new mongoose.Types.ObjectId()

    console.log(user)

    try {
        await user.save()
        res.status(200).send({message: "User created successfully"})
    } catch (err) {
        if (err.name === 'MongoError' && err.code === 11000) {
            res.status(409).send({err: err.message, code: err.code})
        }

        res.status(500).send(err);
        console.log(err);
    }
}

function getAge(dateString)
{
    var today = new Date();
    var birthDate = new Date(dateString);
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate()))
    {
        age--;
    }
    return age;
}

async function signIn (req, res) {

    try {
        let user = await User.find({email: req.body.email, password: req.body.password});
        if (user.length === 0) {
            res.status(404).send({ message: 'No existe el usuario'})
        } else {
            res.status(200).send({
                message: 'Te has logueado correctamente',
                token: service.createToken(user)
            })
        }
    }catch(err) {
        res.status(500).send ({ message: err})
    }
}

async function getUsers (req, res){

    try {
        let users = await User.find().select({"username": 1, "email": 1, "phone": 1});
        res.status(200).send(users);
    } catch(err) {
        res.status(500).send(err)
    }
}

async function getSingleUser (req, res) {

    try {
        const _id = req.params.userId;

        let user = await User.findById(_id);
        if(!user){
            return res.status(404).send({message: 'User not found'})
        }else{
            res.status(200).send(user)
        }

    }catch(err) {
        res.status(500).send(err)
    }
}

async function updateUser(req, res){

    try{
        console.log(req.body);
        const  _id  = req.params.userId;
       let user = await User.findByIdAndUpdate(_id, req.body, {runValidators: true, new: true});
        if(!user){
            return res.status(404).send({message: 'User not found'})
        }else{
            res.status(200).send(user)
        }
    }catch(err){
        if (err.name === 'MongoError' && err.code === 11000) {
            res.status(409).send({err: err.message, code: err.code})
        }
        res.status(500).send(err)
    }
}

async function deleteUser (req, res) {

    try{
        const _id = req.params.userId;
        let user = await User.findOneAndDelete(_id);
        if(!user){
            return res.status(404).send({message: 'User not found'})
        }else{
            res.status(200).send({message:'User deleted successfully'})
        }
    }catch(err){
        res.status(500).send(err)
    }
}


module.exports = {
    signUp,
    signIn,
    getUsers,
    getSingleUser,
    deleteUser,
    updateUser
}
