const express = require("express");
const productsController = require("../controllers/productController.js");

const router = express.Router();

//get all products
router.route("/products").get(productsController.getProducts);

module.exports = router;
