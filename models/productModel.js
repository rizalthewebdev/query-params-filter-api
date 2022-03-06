const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
   name: {
      type: String,
      required: [true, "product name must be provided"],
   },
   type: {
      type: String,
      require: [true, "product type must be provided"],
   },
   price: {
      type: Number,
      required: [true, "product price must be provided"],
   },
   size: {
      type: [Number],
      required: [true, 'product size must be provided']
   },
   gender: {
      type: String,
      enum: {
         values: ["men", "women", "unisex"],
         message: '{VALUE} is not gender'
      },
   },
   color: {
      type: [String],
      required: [true, 'product color must be provided']
   },
   brand: {
      type: String,
      enum: {
         values: ["adidas", "nike", "vans", "converse"],
         message: '{VALUE} is not supported'
      },
   },
   createdAt: {
      type: Date,
      default: Date.now(),
   },
});

module.exports = mongoose.model('Product', productSchema)

