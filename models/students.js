const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Location Schema, Schema is kind of a template
const LocSchema = new Schema( {
    type: {
        default: "Point",
        type: String
    },
    coordinates: {
        type: [Number],
        index: "2dsphere"
    }
});


// Creating a student Schema
const studentSchema = new Schema( {
    name :  {
        type : String,
        required: [true, 'Name field is required']
    },
    idno : {
        type :  Number,
        required : [true, 'ID number is required']
    },
    available: {
        type: Boolean,
        default: false
    },
    location: LocSchema 
});

const Student = mongoose.model('student', studentSchema);

module.exports = Student;