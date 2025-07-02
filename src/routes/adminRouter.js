import express from 'express';
// Import des contrôleurs
import {
  createAdmin,
  loginAdmin,
  getProfilAdmin, refreshAccessToken
} from '../controllers/adminController.js';
// Import du middleware d'authentification
import { verifierAdmin, } from '../middlewares/auth.js';


const adminRouter = express.Router();

// Créer un nouvel admin (à utiliser avec précaution)
adminRouter.post('/register', createAdmin);

// Connexion de l'admin
adminRouter.post('/login', loginAdmin);

// Obtenir les infos du profil connecté (protégé)
adminRouter.get('/profil', verifierAdmin, getProfilAdmin);

//refresh Token
adminRouter.post('/token', refreshAccessToken);

export default adminRouter;
