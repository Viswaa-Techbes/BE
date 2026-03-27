const mongoose = require('mongoose');

const locationSchema = new mongoose.Schema(
  {
    technicianId: {
      type: String, // String or ObjectId, matching your existing structure. Usually String for simple apps or ObjectId ref
      required: true,
      index: true,
    },
    latitude: {
      type: Number,
      required: true,
    },
    longitude: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Location', locationSchema);
