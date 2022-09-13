require("dotenv").config();
require("colors");
const express = require("express");
const connectDB = require("./config/db");
const { errorHandler } = require("./middleware/errorMiddleware");
const cors = require("cors");
const PORT = process.env.PORT || 5000;
const logger = require("./logger/index");

connectDB();

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/quests", require("./routes/questRoutes"));

app.use(errorHandler);

app.listen(PORT, () => {
  console.log("Server running @ PORT:5000");
});
