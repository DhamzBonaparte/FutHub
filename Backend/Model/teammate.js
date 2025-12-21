const mongoose = require("mongoose");

const teammate = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
  },
  location: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
  },
  age: {
    type: Number,
    required: true,
  },
  contact: {
    type: String,
    required: true,
    trim: true,
    match: [/^\d{10}$/, "Contact number must be exactly 10 digits"],
  },
  position: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
  },
  experience: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
  },
  gender: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
  },
  availability: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
  },
  about: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
  },
  confirmedBy: {
    type: String,
    default: "",
    trim: true,
  },
});

module.exports = mongoose.model("teammate", teammate);
