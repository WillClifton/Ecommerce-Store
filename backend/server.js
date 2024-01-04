const express = require("express");
const app = express();
const { resolve } = require("path");
// Replace if using a different env file or config
const env = require("dotenv").config({ path: "./.env" });
const cors = require("cors");
const mongoose = require("mongoose");
const productRoutes = require("./src/routes/productRoutes.js");
const userRoutes = require("./src/routes/userRoutes.js");
const cartRoutes = require("./src/routes/cartRoutes.js");
const cookieParser = require("cookie-parser");

const allowedOrigin = "http://localhost:5173";

const corsOptions = {
  origin: allowedOrigin,
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
  optionsSuccessStatus: 204,
};

// middleware
app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());

// Connect to Mongoose
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
// Check if DB is connected
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("DB connected");
});

// Routes
app.use("/", productRoutes);
app.use("/", userRoutes);
app.use("/", cartRoutes);

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2022-08-01",
});

app.use(express.static(process.env.STATIC_DIR));

app.get("/", (req, res) => {
  const path = resolve(process.env.STATIC_DIR + "/index.html");
  res.sendFile(path);
});

app.get("/config", (req, res) => {
  res.send({
    publishableKey: process.env.STRIPE_PUBLISHABLE_KEY,
  });
});

app.post("/create-payment-intent", async (req, res) => {
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      currency: "AUD",
      amount: req.body.amount,
      automatic_payment_methods: { enabled: true },
    });

    // Send publishable key and PaymentIntent details to client
    res.send({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (e) {
    console.log(e);
    return res.status(400).send({
      error: {
        message: e.message,
      },
    });
  }
});

app.listen(5252, () =>
  console.log(`Node server listening at http://localhost:5252`)
);
