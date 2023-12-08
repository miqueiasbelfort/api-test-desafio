require("dotenv").config();

const express = require("express");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cors());

// Routes
const user = require("./routes/userRoutes");
app.use("/", user);

const port = process.env.PORT || 5000

app.listen(port, () => {
    console.log("The server is running!")
});

module.exports = {app};
