const mongoose = require('mongoose');

const subjectSchema = new mongoose.Schema({
    school : {
        type : mongoose.Schema.ObjectId,
        ref : 'School'
    },
    subject_name: {type: String, required: true},
    subject_code: {type: String, required: true},
    // subject_description: {type: String, required: true},
    // subject_image: {type: String, required: true},
    createAt: {type: Date, default: new Date()},
});

module.exports = mongoose.model('subject', subjectSchema);