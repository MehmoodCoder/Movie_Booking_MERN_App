import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import { serve } from "inngest/express";
import { inngest, functions } from "./inngest/index.js";
import { clerkMiddleware } from '@clerk/express'


dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

await connectDB();

app.use(express.json());
app.use(cors());
app.use(clerkMiddleware())


app.get("/", (req, res) => {
  res.send("Server is running");
});
app.use("/api/inngest", serve({ client: inngest, functions }))

app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});
