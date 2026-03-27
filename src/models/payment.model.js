const mongoose = require('mongoose');

const PaymentSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    jobId: { type: mongoose.Schema.Types.ObjectId, ref: 'Job', required: true },
    amount: { type: Number, required: true },
    status: { type: String, enum: ['pending', 'paid', 'failed', 'refunded'], default: 'pending' },
    paymentMethod: { type: String, enum: ['card', 'cash', 'wallet', 'bank-transfer'], default: 'card' },
  },
  { timestamps: true }
);

module.exports = mongoose.models.Payment || mongoose.model('Payment', PaymentSchema);