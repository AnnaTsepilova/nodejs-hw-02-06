const app = require("./app");

require("dotenv").config();
const { connectMongo } = require("./db/connection");

const PORT = process.env.PORT || 8081;

const start = async () => {
  await connectMongo();

  app.listen(PORT, () => {
    console.log(`Server running. Use our API on port: ${PORT}`);
  });
};

start();
