import { config } from "dotenv";
config();
import express from 'express';
import cors from "cors";
import mongoose from "mongoose";
import apiRoutes from './src/routes/index.js'
import cookieParser from 'cookie-parser';

const app = express();

//Config middleware
app.use(express.json());
app.use(cors({
  origin: ['http://localhost:3001', 'http://localhost:3002'], // ✅ Ajoute les deux origines
  credentials: true
}));
app.use(cookieParser());

//Config routes
app.use('/api',apiRoutes);

app.use(express.static('public'));

// Middleware 404 - à placer après app.use(router)
app.use((req, res, next) => {
  res.status(404).json({ error: 'Route introuvable' });
});



// Connexion a MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✌️ connection reussi à la base de donnée'))
  .catch(err => console.log('❎ Erreur de connexion', err));

// 🔌 Suivi de connexion/déconnexion
mongoose.connection.on('disconnected', () => {
  console.warn('⚠️ Connexion MongoDB perdue !');
});

mongoose.connection.on('error', (err) => {
  console.error('❌ Erreur MongoDB :', err);
});


app.listen(process.env.PORT,() => {
    console.log(`🚀 Serveur démaré sur le port ${process.env.PORT}`);
});

