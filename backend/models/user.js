const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcrypt-nodejs') //Librería para encriptar la contraseña
const crypto = require('crypto')

const FollowingSchema = new Schema({
    username: String,
    picture: String
})

const FollowersSchema = new Schema({
    username: String,
    picture: String
})

//Modelo usuario
const UserSchema = new Schema ({
    _id: mongoose.Schema.Types.ObjectId,
    name: { type: String },
    surname: { type: String },
    username: { type: String, unique: true },
    email: { type: String, unique:true},
    gender: { type: String },
    birthday: { type: Date},
    phone: { type: Number},
    location: String,
    picture: String,
    password: { type: String },
    signupDate: { type: Date, default: Date.now() },
    lastLogin: Date,
    interests: { type: [String], enum: ['Pasta', 'Meat', 'Fish', 'Italian', 'Mexican'] },
    rank: String,
    dish: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Dish'
    },
    following: FollowingSchema,
    followers: FollowersSchema,
    money: Number,
    points: Number,
    aboutme: String
})


//Función que se ejecuta antes de que se salve
UserSchema.pre('save', (next) => {
    let user = this

    //Genera un salt de 10 = num de dígitos aleatorios que se le agrega al hash
    bcrypt.genSalt(10, (err, salt) => {
        if (err) return next(err)

        //Hash cifra la contraseña creando un código
        bcrypt.hash(user.password, salt, null, (err, hash) => {
            if (err) return next(err)

            user.password = hash
            next()
        })
    })
})

/*
//Función Gravatar
UserSchema.methods.gravatar = function () {
    //Si user no tiene email registrado en gravatar, devuelve un gravatar by default
    if (!this.email) return 'http://gravatar.com/avatar/?s=200&d=retro'

    //md5 = tipo de hash que usa gravatar
    const md5 = crypto.createHash('md5').update(this.email).digest('hex')
    return `https://gravatar.com/avatar/${md5}?s=200&d=retro`
}
*/

module.exports = mongoose.model('User', UserSchema)
