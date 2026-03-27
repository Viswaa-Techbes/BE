const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema(
  {
    customerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    technicianId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    serviceType: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    status: {
      type: String,
      enum: ['pending', 'assigned', 'in_progress', 'paused', 'completed', 'cancelled'],
      default: 'pending',
    },
    priority: {
      type: String,
      enum: ['low', 'medium', 'high'],
      default: 'medium',
    },
    scheduledDate: {
      type: Date,
      required: true,
    },
    location: {
      address: {
        type: String,
        required: true,
      },
      postalCode: {
        type: String,
        required: true,
      },
    },
    notes: [
      {
        text: String,
        timestamp: {
          type: Date,
          default: Date.now,
        },
        author: String,
      },
    ],
    startTime: {
      type: Date,
    },
    endTime: {
      type: Date,
    },
    totalDuration: {
      type: Number, // Stored in seconds
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Job', jobSchema);
