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
  origin: ['https://cbc-front.netlify.app', 'https://craubc.fr', 'http://localhost:3001'],
  credentials: true
}));
app.use(cookieParser());

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

// Routes
app.use('/api', apiRoutes);

// 404
app.use((req, res) => {
  res.status(404).json({ error: "Route introuvable" });
});

export const handler = serverless(app);
