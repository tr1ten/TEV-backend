require('dotenv').config();
const mongoose = require("mongoose");
const URI =  process.env.MONGO_URI;
const start = async () => {
    try {
      await mongoose.connect(
            URI,
            
      );
    } catch (error) {
      console.error(error);
      process.exit(1);
    }
  };

module.exports = start;