// This code is for creating a blueprint (called a schema) for something called a "class" in a school.
// It uses a library called Mongoose that helps us connect to a database (like a big storage box for information).

const mongoose = require('mongoose'); // We are using Mongoose to help with our database.

const classSchema = new mongoose.Schema({ // We are creating a new schema for our class.
    school : { // This part is for the school that the class belongs to.
        type : mongoose.Schema.ObjectId, // We are saying that the school is identified by a special ID (like a name tag).
        ref : 'School' // This means that we are linking it to another model called 'School'.
    },
    class_text: {type: String, required: true}, // This is a description of the class, and we need to fill it out (it's required).
    class_numb: {type: Number, required: true}, // This is a number for the class (like Class 101), and it also needs to be filled out.
    attendee: {type: Number, required: 'teacher'}, // This is for the number of teachers attending the class, and it's also required.
    createAt: {type: Date, default: new Date()}, // This keeps track of when the class was created, and it will automatically use the current date.
});

// Finally, we are saying we want to use this classSchema to create a model called 'class', 
// which we can use to interact with our database to create, read, update, or delete classes.
module.export = mongoose.model('class',classSchema) // Oops, this should be 'module.exports' instead of 'module.export'.