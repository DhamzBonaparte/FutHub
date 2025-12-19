const mongoose = require("mongoose");

const Schema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    trim: true,
    lowercase:true
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
    lowercase:true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
    trim: true,
  },
  roles:{
    type:String,
    required:true,
    trim: true,
    lowercase:true
  },
  location:{
    type:String,
    required:true,
    trim: true,
    lowercase:true
  },
  phone:{
    type: String,
    required: true,
    trim: true,
  },
  agreedToTerms: {
    type: Boolean,
    required: true,
  },
  createdAt:{
    type:Date,
    default:Date.now,
    required:true
  }
});

module.exports = mongoose.model("Signup",Schema);