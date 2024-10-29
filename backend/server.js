import express from "express";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import { v2 as cloudinary } from "cloudinary";
import mongoose from "mongoose";
import path from "path";

import userRouter from "./routes/user.route.js";
import authRouter from "./routes/auth.Route.js";
import postRouter from "./routes/post.Route.js";
import notificationRouter from "./routes/notification.Route.js";

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const app = express();
const PORT = process.env.PORT || 9000;
const __dirname = path.resolve();

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDb Connected"));

app.use(express.json({ limit: "5mb" }));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// Example for setting timeout in Express app (in your main app file)
app.use((req, res, next) => {
  res.setTimeout(120000, () => {
    console.log("Request has timed out.");
    res.status(408).send("Request has timed out");
  });
  next();
});

app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);
app.use("/api/post", postRouter);
app.use("/api/notification", notificationRouter);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "frontend/dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "frontend", "dist", "index.html"));
  });
}

app.get("/", (req, res) => {
  res.json("home");
});

app.listen(PORT, console.log(`Server Started at PORT: ${PORT}`));

// console.log("Error in x", error.messege)
// return res.status(500).json({error:"Internal Server Error"})
