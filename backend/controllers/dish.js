'use strict'

const Dish = require('../models/dish')


//GET ALL PRODUCTS
function getDishs (req, res) {
    //Devuelve un callback con las dos variables petición y respuesta
    Dish.find({}, (err, dishs) => {
        if (err) return res.status(500).send({message: `Error al realizar la petición: ${err} `})
        if (!dishs) return res.status(404).send({message: 'No existen platos'})

        //Finalizar petición y comprobar que funciona
        res.status(200).send(dishs)
    })
}

//GET PRODUCT BY ID
function getDish (req,res) {
    let dishId = req.params.dishId

    Dish.findById(dishId, (err, dish) => {
        if (err) return res.status(500).send({message: `Error al realizar la petición: ${err} `})
        if (!dish) return res.status(404).send({message: `El plato no existe`})

        res.status(200).send({ dish })
    })
}

//CREATE PRODUCT
function saveDish (req, res) {
    console.log('POST /api/dish')
    console.log(req.body) //Mostrar todo el cuerpo (body)

    let dish = new Dish()
    dish.name = req.body.name
    dish.picture = req.body.picture
    dish.price = req.body.price
    dish.quantity = req.body.quantity
    dish.tags = req.body.tags
    dish.description = req.body.description

    dish.save((err, dishStored) => {
        if (err) res.status(500).send({message: `Error al salvar en la BBDD: ${err}`})

        res.status(200).send(dishStored)
    })
}

//UPDATE PRODUCT
function updateDish (id) {
    let dishId = req.params.dishId
    let update = req.body

    Dish.findByIdAndUpdate(dishId, update, (err, dishUpdated) => {
        if (err) res.status(500).send({message: `Error al actualizarlo: ${err}`})

        res.status(200).send(dishUpdated)
    })
}

//DELETE PRODUCT
function deleteDish (id) {
    let dishId = req.params.dishId

    Dish.findById(dishId, (err, dish) => {
        if (err) res.status(500).send({message: `Error al eliminarlo: ${err}`})

        dish.remove(err => {
            if (err) res.status(500).send({message: `Error al eliminarlo: ${err}`})

            res.status(200).send({message: `Plato eliminado`})
        })
    })
}

module.exports = {
    getDishs,
    getDish,
    saveDish,
    updateDish,
    deleteDish
}
