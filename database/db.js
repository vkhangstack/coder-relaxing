const mongoose = require("mongoose");

module.exports = async () => {
  try {
    const connectionParams = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    };
    await mongoose.connect(process.env.urlDB, connectionParams);
    console.log("Connected to database");
  } catch (error) {
    console.log("Could not connect to database");
  }
};
