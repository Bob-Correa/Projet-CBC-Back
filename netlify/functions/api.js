import { config } from "dotenv";
config();
import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import serverless from "serverless-http";
import apiRoutes from "../../backend/src/routes/index.js";

const app = express();

// Middlewares
app.use(express.json());
app.use(cors({
  origin: ['http://localhost:3001', 'https://craubc.fr'],
  credentials: true
}));
app.use(cookieParser());

// Routes
app.use('/api', apiRoutes);

// 404
app.use((req, res) => {
  res.status(404).json({ error: "Route introuvable" });
});

// Connexion MongoDB (une seule fois)
let isConnected = false;

async function connectDB() {
  if (isConnected) return;
  await mongoose.connect(process.env.MONGO_URI);
  isConnected = true;
  console.log("MongoDB connecté");
}

app.use(async (req, res, next) => {
  await connectDB();
  next();
});

export const handler = serverless(app);
