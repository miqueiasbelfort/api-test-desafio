require("dotenv").config();

const express = require("express");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cors());

// Routes
const user = require("./routes/userRoutes");
app.use("/", user);

module.exports = {app};
