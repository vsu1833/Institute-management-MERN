
const mongoose = require('mongoose');

const teacherSchema = new mongoose.Schema({
    school : {
        type : mongoose.Schema.ObjectId,
        ref : 'School'
    },
    name: {type: String, required: true},
    email: {type: String, required: true},
    qualification: {type: String, required: true},
    age: {type: Number, required: true},
    gender: {type: String, required: true},
    teacher_image: {type: String, required: true},
    password: {type: String, required: true},
    createAt: {type: Date, default: new Date()},
});

module.exports = mongoose.model('teacher', teacherSchema);
