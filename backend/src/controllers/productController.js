const mongoose = require("mongoose");

exports.getProducts = async (req, res) => {
  try {
    // Access products collection directly
    const productsCollection = mongoose.connection.collection("products");

    const products = await productsCollection.find({}).toArray();

    res.status(200).json({
      status: "success",
      data: {
        products,
      },
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};
