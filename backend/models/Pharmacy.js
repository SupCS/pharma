const mongoose = require('mongoose');
const productSchema = require('./Product').schema;

const pharmacySchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    address: { type: String, required: true },
    products: [productSchema],
    imageUrl: { type: String, required: true }
  });
  

module.exports = mongoose.model('Pharmacy', pharmacySchema);
