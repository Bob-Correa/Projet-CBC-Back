import { config } from "dotenv";
config();
import express from 'express';
import cors from "cors";
import mongoose from "mongoose";

const express = 'express';
const cors = 'cors';
const mongoose = 'mongoose';

const app = express();

//Config middleware
app.use(express.json());
app.use(cors());

// Connexion a MongoDB
mongoose.connect(process.env.MONGO_URI,{
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log('✌️ connection reussi à la base de donnée'))
.catch(err => console.log('❎ Erreur de connexion', err));

app.listen(process.env.PORT,() => {
    console.log(`🚀 Serveur démaré sur le port ${process.env.PORT}`);
});

