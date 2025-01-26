const mongoose = require('mongoose');

const schedueschema = new mongoose.Schema({
    school : {
        type : mongoose.Schema.ObjectId,
        ref : 'School'
    },
    subject : {type: mongoose.Schema.ObjectId, ref: 'Subject'},
    teacher : {type: mongoose.Schema.ObjectId, ref: 'Teacher'},
    class : {type: mongoose.Schema.ObjectId, ref: 'Class'},
    startTime : {type: Date, required: true},
    endTime : {type: Date, required: true},

    // day : {type: String, required: true},
    // time : {type: String, required: true},
    // duration : {type: Number, required: true},
    // status : {type: String, required: true},

    createAt: {type: Date, default: new Date()},
})

const Schedule = mongoose.model('Schedule', schedueschema);

module.exports = Schedule;
