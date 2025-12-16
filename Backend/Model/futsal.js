const mongoose = require("mongoose");

const futsalSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
      unique: true,
    },
    images: {
      type: [String], 
      default: [],
    },
    owner: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },
    futsal: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },
    location: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
      unique:true
    },
    contact: {
      type: String,
      required: true,
      trim: true,
    },
    address: {
      type: String,
      trim: true,
      lowercase: true,
      required: true,
    },

    artificialTurf: { type: Boolean, default: false },
    floodlights: { type: Boolean, default: false },
    changingRooms: { type: Boolean, default: false },
    showers: { type: Boolean, default: false },
    parking: { type: Boolean, default: false },
    cafeteria: { type: Boolean, default: false },
    firstAid: { type: Boolean, default: false },
    equipmentRental: { type: Boolean, default: false },

    price: { type: String, trim: true, required: true },
    capacity: { type: String, trim: true, required: true },
    about: { type: String, trim: true, required: true },

    approved: { type: Boolean, default: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Futsal", futsalSchema);
