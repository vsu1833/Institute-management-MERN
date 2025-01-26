const mongoose = require('mongoose');

const noticeSchema = new mongoose.Schema({
    school : {type: mongoose.Schema.ObjectId, ref: 'School'},
    title : {type: String, required: true},
    message : {type: String, required: true},
    audience : {type: String, enum: [ 'teacher', 'students'], required: true},
    createAt: {type: Date, default: new Date()},
})

const Notice = mongoose.model('Notice', noticeSchema);

module.exports = Notice;

