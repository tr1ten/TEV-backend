const mongoose = require("mongoose");
const URI =  "mongodb+srv://shubh:t3Mj93ti5MQbvTtA@cluster0.8yaor.mongodb.net/?retryWrites=true&w=majority";
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