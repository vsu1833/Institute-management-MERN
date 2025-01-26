 const mongoose = require('mongoose');

 const attendanceSchema = new mongoose.Schema({
    school : {type: mongoose.Schema.ObjectId, ref: 'School'},
    student : {type: mongoose.Schema.ObjectId, ref: 'Student'},
    class : {type: mongoose.Schema.ObjectId, ref: 'Class'},
    date : {type: Date, required: true},
    status : {type: String, enum: ['present', 'absent'], default: 'absent'},
    createAt: {type: Date, default: new Date()},
 })

 const Attendance = mongoose.model('Attendance', attendanceSchema);

 module.exports = Attendance;
