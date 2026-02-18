import express from 'express';
// Import des contrôleurs
import {
  createAdmin,
  loginAdmin,
  getProfilAdmin, refreshAccessToken, getTousLesAdmins, modifierRoleAdmin, supprimerAdmin
} from '../controllers/adminController.js';
// Import du middleware d'authentification
import { verifierAdmin, requireRole } from '../middlewares/auth.js';


const adminRouter = express.Router();

// Créer un nouvel admin (à utiliser avec précaution)
adminRouter.post('/register',verifierAdmin, requireRole('superadmin'), createAdmin);
// ⚠️ Route publique pour créer un admin — à désactiver en production
adminRouter.post('/create', createAdmin);

// Obtenir tous les admins (protégé)
adminRouter.get('/all', verifierAdmin, requireRole('superadmin'), getTousLesAdmins);
// Modifier le rôle d'un admin (protégé)
adminRouter.get('/profil/:id', verifierAdmin, getProfilAdmin);
adminRouter.put('/role/:id', verifierAdmin, requireRole('superadmin'), modifierRoleAdmin);
// Supprimer un admin (protégé)
// Note : Assurez-vous de bien gérer la suppression du superadmin pour éviter les erreurs
adminRouter.delete('/:id', verifierAdmin, requireRole('superadmin'), supprimerAdmin);

// Connexion de l'admin
adminRouter.post('/login', loginAdmin);

// Obtenir les infos du profil connecté (protégé)
adminRouter.get('/profil', verifierAdmin, getProfilAdmin);

//refresh Token
adminRouter.post('/token', refreshAccessToken);

adminRouter.get('/ping', (req, res) => {
  res.json({ message: 'adminRouter fonctionne ✅' });
});




export default adminRouter;
