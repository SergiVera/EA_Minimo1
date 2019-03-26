'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema

//Crear esquema plato
const DishSchema = Schema({
    name: String,
    picture: String,
    price: { type: Number, default:0 },
    quantity: Number,
    tags: {type: String, enum: ['pasta', 'meat', 'fish']},
    description: String
})

module.exports = mongoose.model('Product', DishSchema)