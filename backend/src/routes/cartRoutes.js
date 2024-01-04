const express = require("express");
const cartController = require("../controllers/cartController.js");

const router = express.Router();

//add cart items
router.post("/addcart", cartController.addCart);

// get user cart
router.get("/cart", cartController.getCart);
module.exports = router;

//  update cart
router.post("/updatecart", cartController.updateCart);

// clear users cart
router.post("/clearcart", cartController.clearCart);
