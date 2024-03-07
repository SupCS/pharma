const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { 
    type: Number, 
    required: true,
    validate: {
      validator: function(v) {
        return v >= 0;
      },
      message: props => `${props.value} is not a valid price! Price must be non-negative.`
    }
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  imageUrl: { type: String, required: true }
});

module.exports = mongoose.model('Product', productSchema);
