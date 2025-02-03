const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const userRouter = require("./routes/userRouter");
const errorHandler = require("./middlewares/errorHandlerMiddleware");
const categoryRouter = require("./routes/categoryRouter");
const transactionRouter = require("./routes/transactionRouter");
require("dotenv").config(); // Load environment variables from .env file

const app = express();

//! Connect to MongoDB using the mongo_url from .env file
mongoose
  .connect(process.env.MONGO_URL) // Use MONGO_URL from .env
  .then(() => console.log("Connected to Database"))
  .catch((e) => console.log("Error connecting to DB: ", e));

//! Cors config
const corsOptions = {
  origin: ["http://localhost:5173"],
};
app.use(cors(corsOptions));

//! Middlewares
app.use(express.json()); // Pass incoming JSON data

//! Routes
app.use("/", userRouter);
app.use("/", categoryRouter);
app.use("/", transactionRouter);

//! Error handler
app.use(errorHandler);

//! Start the server
const PORT = process.env.PORT || 8000;  // Use PORT from .env or default to 8000
app.listen(PORT, () =>
  console.log(`Server is running on port ${PORT}`)
);
