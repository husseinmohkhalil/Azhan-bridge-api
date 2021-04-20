const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please fill your name"],
  },
  description: {
    type: String,
    required: [true, "Please Description"],
  },
 
});


const product = mongoose.model("product", productSchema);
module.exports = product;
