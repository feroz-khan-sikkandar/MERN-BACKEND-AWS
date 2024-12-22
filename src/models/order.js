const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true },
  address: { type: String, required: true },
  city: { type: String, required: true },
  postalCode: { type: Number, required: true },
  productIds: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Book',
      required: true
    }
  ],
  totalPrice: { type: Number, required: true }

}, { timestamps: true });

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;


