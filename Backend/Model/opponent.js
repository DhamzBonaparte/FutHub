const mongoose = require("mongoose");

const opponentSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  teamName: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
  },
  totalPlayers: {
    type: Number,
    required: true,
    min: 5,
    max: 15,
  },
  location: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
  },
  averageAge: {
    type: Number,
    required: true,
  },
  contact: {
    type: String,
    required: true,
    trim: true,
    match: [/^\d{10}$/, "Contact number must be exactly 10 digits"],
  },
  venue: {
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
  matchDate: {
    type: Date,
    required: true,
  },
  players: [
    {
      name: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
      },
    },
  ],
  level: {
    type: String,
    required: true,
    trim: true,
  },
  timeFrom: {
    type: String,
    required: true,
  },
  timeTo: {
    type: String,
    required: true,
  },
  confirmedBy: {
    type: String,
    default: "",
    trim: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Opponent", opponentSchema);
