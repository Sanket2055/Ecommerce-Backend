const app = require("./app");
const dotenv = require("dotenv");
const connectDB = require("./config/database");

// handling uncaught exception
process.on("uncaughtException", (err) => {
  console.log("UNCAUGHT EXCEPTION 🤯", err.name, err.message);
  console.log('Shutting down the server because of uncaught exception');
  process.exit(1);
});

// config
dotenv.config({ path:"backend/config/config.env" }); // path to config file
// connect to database
const mongoose = require("mongoose");
const connectDatabase = require("./config/database");

connectDatabase();

const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () => {
  console.log("Server is running on port", PORT);
});


// unhandled promise rejection
process.on("unhandledRejection" ,err=>{
  console.log(`Error : ${err.message}`);
  console.log('Shutting down...due to unhandled rejection');
  server.close(()=>{
    process.exit(1);
  });
  
})