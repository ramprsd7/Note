const mongoose = require('mongoose');

var Note = mongoose.model('Note', {
    title: {
        type: String
    },
    description: {
        type: String,
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
})

module.exports = { Note };