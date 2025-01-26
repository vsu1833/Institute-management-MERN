const mongoose = require('mongoose');   

const examinationSchema = new mongoose.Schema({
    school : {type: mongoose.Schema.ObjectId, ref: 'School'},
    class : {type: mongoose.Schema.ObjectId, ref: 'Class'},
    subject : {type: mongoose.Schema.ObjectId, ref: 'Subject'},
    examType : {type: String, enum: ['midterm', 'final'], required: true}, 
    examDate : {type: Date, required: true},
    // date : {type: Date, required: true},  
    // startTime : {type: Date, required: true},
    // endTime : {type: Date, required: true},
    createAt: {type: Date, default: new Date()},
})

const Examination = mongoose.model('Examination', examinationSchema);

module.exports = Examination;
