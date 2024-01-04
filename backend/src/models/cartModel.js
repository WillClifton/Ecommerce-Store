const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const cartSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true, // Assuming each email corresponds to a unique cart
  },
  cart: {
    type: Array,
    default: [], // You can set a default value if needed
  },
});

const Cart = mongoose.model("Cart", cartSchema);

module.exports = Cart;
