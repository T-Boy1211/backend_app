const mongoose = require("mongoose")

const productSchema = new mongoose.Schema({
  image: { type: String, required: true },
  brand: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String, required: true },
  // features: [
  //   {
  //     key: {
  //       type: String,
  //       required: true
  //     },
  //     value: {
  //       type: String,
  //       required: true
  //     }
  //   }
  // ]
});

module.exports = mongoose.model('Product', productSchema)