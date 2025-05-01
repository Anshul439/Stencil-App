import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// mongoose
//   .connect(process.env.MONGO_URI!)
//   .then(() => console.log("MongoDB connected"))
//   .catch((err) => console.error("MongoDB connection error:", err));

app.get("/", (_, res) => {
  res.send("Stencil backend running");
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
