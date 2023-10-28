const mongoose = require("mongoose");
//creating the medication model
const MedicinesSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    desc: {
      type: String,
      max: 500,
    },
    name: {
      type: String,
      required: true,
    },
    dose: {
      type: Number,
      default: 0,
      max: 5,
    },
    times: {
      type: Array,
      default: [],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Medicine", MedicinesSchema);