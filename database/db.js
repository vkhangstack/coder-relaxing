const mongoose = require("mongoose");

module.exports = async () => {
  try {
    const connectionParams = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    };
    mongoose.connect(
      process.env.MONGO_URL || "mongodb://localhost:27017/girls",
      connectionParams
    );
    // eslint-disable-next-line no-console
    console.log("Connected to database");
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log("Could not connect to database");
  }
};
