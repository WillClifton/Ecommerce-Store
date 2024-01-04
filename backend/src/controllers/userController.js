const User = require("../models/userModel.js");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const serialize = require("cookie");

exports.signup = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Hash the password using bcryptjs
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      email,
      password: hashedPassword,
    });

    await newUser.save();

    res.status(201).json({
      status: "success",
      message: "User successfully registered",
      data: {
        user: newUser,
      },
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};

exports.signin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find the user by email
    const user = await User.findOne({ email });

    // Check if user exists
    if (!user) {
      return res.status(401).json({
        status: "fail",
        message: "Invalid email or password",
      });
    }
    console.log("success signin");

    // Check if the entered password is correct
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({
        status: "fail",
        message: "Invalid email or password",
      });
    }

    // Create a JWT token
    const token = jwt.sign({ userId: user._id }, "scretkey123", {
      expiresIn: "30d",
      algorithm: "HS256",
    });

    res.cookie("jwt", token, {
      httpOnly: true,
      maxAge: 30 * 24 * 60 * 60 * 1000,
    });

    res.status(200).json({
      status: "success",
      message: "User successfully signed in",
      data: {
        user,
      },
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};

// Authenticate the user
exports.authUser = async (req, res, next) => {
  try {
    // Extract the JWT token from the cookie
    const token = req.cookies.jwt;

    if (!token) {
      return res.status(401).json({
        status: "fail",
        message: "Unauthorized: Please log in",
      });
    }

    // Verify the token

    const decodedToken = jwt.verify(token, "scretkey123", {
      algorithm: "HS256",
    });

    // Find the user based on the decoded token
    const user = await User.findById(decodedToken.userId);

    // Check if the user exists
    if (!user) {
      return res.status(401).json({
        status: "fail",
        message: "Unauthorized: User not found",
      });
    }

    req.user = user;

    next();
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};

exports.logOut = async (req, res) => {
  const { cookies } = req;

  const jwt = cookies.jwt;
  console.log(jwt);
  if (!jwt) {
    return res.status(401).json({
      status: "error",
      error: "Unauthorized",
    });
  }

  res.clearCookie("jwt");

  // Send the JWT in the response body
  return res.status(200).json({
    status: "success",
    message: "Logout successful",
    token: jwt, // Include the JWT in the response body
  });
};
