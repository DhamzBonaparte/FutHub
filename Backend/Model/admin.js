const mongoose = require('mongoose');

const admin = mongoose.Schema({
    admin:{
        type:String,
        trim:true,
        required:true,
        lowercase:true,
        default:'admin'
    },password:{
        type:String,
        trim:true,
        required:true
    }
})

module.exports = mongoose.model('admin',admin);