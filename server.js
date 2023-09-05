import app from "./app.js";

import mongoose from "mongoose";

const DB_HOST =
  "mongodb+srv://vovaplyuto:4zdbB6hfUQc7i7Zk@cluster0.f6hkse6.mongodb.net/db-contacts?retryWrites=true&w=majority";

mongoose.set("strictQuery", true);

mongoose
  .connect(DB_HOST)
  .then(() => {
    console.log("Database connection successful");

    app.listen(3000, () => {
      console.log("Server running. Use our API on port: 3000");
    });
  })
  .catch((error) => {
    console.log(error.message);
    process.exit(1);
  });
