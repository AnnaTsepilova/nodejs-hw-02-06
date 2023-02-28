const mongoose = require("mongoose");

mongoose.set("strictQuery", false);

const connectMongo = async () => {
  try {
    const connection = await mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Database connection successful");
    return connection;
  } catch (error) {
    console.log("Database connection failed");
    process.exit(1);
  }
};

module.exports = { connectMongo };
