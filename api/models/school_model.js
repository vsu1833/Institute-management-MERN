const mongoose = require('mongoose');

const schoolSchema = new mongoose.Schema({
    school_name:{type:String,required:true},
    school_image:{type:String,required:true},
    owner_name:{type:String,required:true},
    email:{type:String,required:true},
    password:{type:String,required:true},
    createAt : {type:Date,default:new Date() },
})

module.export = mongoose.model('school',schoolSchema)
