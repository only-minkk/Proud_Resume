import dotenv from "dotenv";
import connectDB from "./config/db.js";
import redisClient from "./config/redis.js";
import app from "./src/app.js";

dotenv.config();

const PORT = process.env.SEVER_PORT || 5005;

connectDB();
await redisClient.connect();

app.listen(PORT, () => {
  console.log("Server is running.");
});
