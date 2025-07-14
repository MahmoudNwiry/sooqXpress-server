const mongoose = require('mongoose');

const offerSchema = new mongoose.Schema({
  title: String,
  discountType: { type: String, enum: ['percent', 'fixed'], default: 'percent' },
  discountValue: Number,
  products: [{ type: mongoose.Types.ObjectId, ref: 'Product' }],
  expiresAt: Date,
  active: { type: Boolean, default: true }
});

module.exports = mongoose.model('Offer', offerSchema);