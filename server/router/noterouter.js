const express = require('express');
var router = express.Router();
var ObjectId = require('mongoose').Types.ObjectId;

var { Note } = require('../models/note');

router.get('/', (req, res) => {
    Note.find((err, note) => {
        if (!err) { res.send(note); } else
            console.log('error in getting Notes', +JSON.stringify(err, undefined, 2))
    }).sort({ createdAt: -1 });
});

router.get('/:id', (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No record/Notes with given id : ${req.params.id}`);

    Note.findById(req.params.id, (err, note) => {
        if (!err) { res.send(note); } else { console.log('Error in Retriving Notes :' + JSON.stringify(err, undefined, 2)); }
    });
});


/* Add a user note */
router.post('/', (req, res) => {
    var not = new Note({
        title: req.body.title,
        description: req.body.description
    });
    not.save((err, note) => {
        if (!err) { res.send(note); } else { console.log('Error in Saving Notes:' + JSON.stringify(err, undefined, 2)); }
    })
});

// Update
router.put('/:id', (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No record with given id : ${req.params.id}`);

    var not = {
        title: req.body.title,
        description: req.body.description
    };
    Note.findByIdAndUpdate(req.params.id, { $set: not }, { new: true }, (err, note) => {
        if (!err) { res.send(note); } else { console.log('Error in Notes Update :' + JSON.stringify(err, undefined, 2)); }
    });
});

// Delete by ID
router.delete('/:id', (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No record with given id : ${req.params.id}`);

    Note.findByIdAndRemove(req.params.id, (err, note) => {
        if (!err) { res.send(note); } else { console.log('Error in Notes Delete :' + JSON.stringify(err, undefined, 2)); }
    });
});

module.exports = router;