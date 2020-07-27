const express = require('express');
const router = express.Router();

//Model Orders
const Orders = require('../models/Orders');

router.get('/', (req, res, next)=>{
    try {
        Orders.find()
        .exec()
        .then(x => res.send(x)) 
    } catch (e) {
        res.status(500).send(e.toString());
    }
});

router.get('/:id',(req, res)=>{
    try {
        Orders.findById(req.params.id)
        .exec()
        .then(x => res.status(200).send(x))    
    } catch (error) {
        res.status(500).send(e.toString());
    }
})

router.post('/', (req, res)=>{
    Orders.create(req.body)
    .then(x => res.status(201).send(x))
})
router.put('/:id',(req, res)=>{
    Orders.findByIdAndUpdate(req.params.id, req.body)
    .then(() => res.sendStatus(204))
})

router.delete('/:id', (req, res)=>{
    Orders.findOneAndDelete(req.params.id)
    .exec()
    .then(()=> res.sendStatus(204))
})

 module.exports = router;