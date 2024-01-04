const express = require("express");
const userController = require("../controllers/userController.js");

const router = express.Router();

//Signup User
router.post("/signup", userController.signup);

// SignIn User
router.post("/signin", userController.signin);

// Auth user
router.get("/profile", userController.authUser, (req, res) => {
  const authenticatedUser = req.user;

  res.status(200).json({
    status: "success",
    message: "User profile retrived",
    data: {
      user: authenticatedUser,
    },
  });
});

// Log out user
router.post("/logout", userController.logOut);

module.exports = router;
