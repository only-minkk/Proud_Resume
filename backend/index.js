import app from "./src/app.js";
import connectDB from "./config/db.js";
import dotenv from "dotenv";

dotenv.config();

const PORT = process.env.SEVER_PORT || 5005;

connectDB();

app.listen(PORT, () => {
  console.log("Server is running.");
});
