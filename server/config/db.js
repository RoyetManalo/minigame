const mongoose = require("mongoose");
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    // console.log(`MongoDB Connected: ${conn.connection.host}`.cyan.underline);
    console.log(`MongoDB Connected: ${conn.connection.host}`.cyan.underline);
  } catch (error) {
    console.log(error);
    process.exit(1); // terminate node js app
  }
};

module.exports = connectDB;
