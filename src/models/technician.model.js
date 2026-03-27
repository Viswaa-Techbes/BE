const mongoose = require('mongoose');

const TechnicianSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
    skills: [{ type: String }],
    availability: { type: String, enum: ['available', 'busy', 'unavailable'], default: 'available' },
    location: { type: String, trim: true },
    status: { type: String, enum: ['active', 'inactive'], default: 'active' },
  },
  { timestamps: true }
);

module.exports = mongoose.models.Technician || mongoose.model('Technician', TechnicianSchema);