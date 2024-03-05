const mongoose = require('mongoose')     //search mongoose schema
const { Schema } =mongoose;              //destructing in js   //call back funtionality in js
const UserSchema = new Schema({         //read about models 
    fullname:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
    },
    phonenumber:{
        type: String,
        required: true
    },
    collegename:{
        type: String,
        required: true
    },
    rollnumber:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    score:{
        type: Number,
        default: 0
    }
});
 module.exports = mongoose.model('User', UserSchema)     //whenever it is used, user named collection will be created inside your db                                     
