const mongoose = require("mongoose");

module.exports = async () => {
  try {
    const connectionParams = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    };
    await mongoose.connect(
      process.env.MONGO_URL || "mongodb://localhost:27017/girls", // mongo cloud or mongodb on local
      connectionParams
    );
    console.log("Connected to database");
  } catch (error) {
    console.log("Could not connect to database");
  }
};
