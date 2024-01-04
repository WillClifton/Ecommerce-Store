const Cart = require("../models/cartModel.js");

// Add users cart items to DB
exports.addCart = async (req, res) => {
  try {
    const newCartData = req.body.newCart;
    const email = newCartData.email;

    let existingCart = await Cart.findOne({ email });
    // Check if there is an existing user map over existing cart items
    if (existingCart) {
      // find cart items that match and replace those cart
      const updatedCartItems = existingCart.cart.map((existingCartItem) => {
        // find cart items that match and replace those cart items
        const newItem = newCartData.cart.find(
          (newCartItem) => newCartItem.id === existingCartItem.id
        );

        return newItem ? newItem : existingCartItem;
      });
      // filter out existing cart items
      const newCartItems = newCartData.cart.filter(
        (newCartItem) =>
          !existingCart.cart.some(
            (existingCartItem) => existingCartItem.id === newCartItem.id
          )
      );
      // concat updatedCartItems and Existing cart items
      existingCart.cart = updatedCartItems.concat(newCartItems);

      await existingCart.save();

      res
        .status(200)
        .json({ message: "Cart updated successfully", cart: existingCart });
    } else {
      // if no existingCart create one
      const newCart = new Cart(newCartData);

      await newCart.save();
      res
        .status(201)
        .json({ message: "Cart added successfully", cart: newCart });
    }
  } catch (error) {
    console.error(error.message);

    res.status(500).json({ message: "Internal server error" });
  }
};

// Get Users cart
exports.getCart = async (req, res) => {
  try {
    const { email } = req.query;

    let userCart = await Cart.findOne({ email });

    console.log(req.body);

    res.status(200).json({ message: "sucess", cart: userCart });
  } catch (error) {
    console.error(error.message);
    console.log(req.query);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Update Users Cart
exports.updateCart = async (req, res) => {
  try {
    const newCartData = req.body.newCart;
    const email = newCartData.email;

    let existingCart = await Cart.findOne({ email });

    if (existingCart) {
      existingCart.set(newCartData);
      await existingCart.save();

      res
        .status(200)
        .json({ message: "Cart updated successfully", cart: existingCart });
    } else {
      res.status(404).json({ message: "Cart not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Clear Users cart
exports.clearCart = async (req, res) => {
  try {
    const email = req.body.email;

    let existingCart = await Cart.findOne({ email });

    console.log(email);

    if (existingCart) {
      existingCart.cart = [];
      await existingCart.save();
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
