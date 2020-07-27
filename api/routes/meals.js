const express = require('express');
const router = express.Router();

//Model Meals
const Meals = require('../models/Meals');

// const Meals = require('../../sample.json');

router.get('/', (req, res)=>{
    try {
        Meals.find()
        .exec()
        .then(x => {
            console.log(x);
            res.status(200).send(x);
        })
        // res.send("Welcome to a basic express App");

    } catch (e) {
        res.status(500).send(e.toString());
    }
});
 
router.get('/:id', (req, res)=>{
    try {
        Meals.findById(req.params.id)
        .exec()
        .then(x => res.status(200).send(x))
    } catch (e) {
        res.status(500).send(e.toString());
    }

})

router.post('/', (req, res)=>{
    try {
        Meals.create(req.body)
        .then(x => res.status(201).send(x))
    } catch (e) {
        res.status(500).send(e.toString());
    }
})

router.put('/:id',(req, res)=>{
    try {
        Meals.findByIdAndUpdate(req.params.id, req.body)
        .then(() => res.sendStatus(204))
    } catch (e) {
        res.status(500).send(e.toString());  
    }
})

router.delete('/:id', (req, res)=>{
    try {
        Meals.findOneAndDelete(req.params.id)
        .exec()
        .then(()=> res.sendStatus(204))
    } catch (e) {
        res.status(500).send(e.toString());
    }
})

 module.exports = router;

//  Meals.find({}).exec((err, meals) =>{
//     if(err) return res.status(500).send({message: 'Error al devolver los datos.'});
//     if(!meals) return res.status(404).send({message: 'El proyecto no existe.'});
//     return res.status(200).send({meals});
// })