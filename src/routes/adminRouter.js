import express from 'express';
import {
  createAdmin,
  loginAdmin,
  getProfilAdmin
} from '../controllers/adminController.js';

import { verifierAdmin } from '../middleware/auth.js';

const adminRouter = express.Router();

// Créer un nouvel admin (à utiliser avec précaution)
adminRouter.post('/register', createAdmin);

// Connexion de l'admin
adminRouter.post('/login', loginAdmin);

// Obtenir les infos du profil connecté (protégé)
adminRouter.get('/profil', verifierAdmin, getProfilAdmin);

export default adminRouter;
