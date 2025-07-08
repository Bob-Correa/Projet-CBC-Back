import express from 'express';
import {
  creerInscription,
  getInscriptions,
  getInscriptionById,
  updateInscription,
  deleteInscription,
  validerInscription,
  refuserInscription,
  getInscriptionsValidees,
  getInscriptionsNonValidees,
  getInscriptionsRefusees,
  getInscriptionsEnAttente
} from '../controllers/inscriptionController.js';

import { verifierAdmin } from '../middlewares/auth.js'; // facultatif si tu veux sécuriser certaines routes

const inscriptionRouter = express.Router();

// 🆕 Création d'une inscription (publique)
inscriptionRouter.post('/', creerInscription);

// 📥 Obtenir toutes les inscriptions ou filtrées par ville/email/statut (admin recommandé)
inscriptionRouter.get('/', verifierAdmin, getInscriptions);

// 🔎 Obtenir une inscription par ID
inscriptionRouter.get('/:id', verifierAdmin, getInscriptionById);

// ✏️ Mettre à jour une inscription
inscriptionRouter.put('/:id', verifierAdmin, updateInscription);

// 🗑 Supprimer une inscription
inscriptionRouter.delete('/:id', verifierAdmin, deleteInscription);

// ✅ Valider une inscription
inscriptionRouter.patch('/:id/valider', verifierAdmin, validerInscription);

// 🚫 Refuser une inscription
inscriptionRouter.patch('/:id/refuser', verifierAdmin, refuserInscription);

// 📋 Récupérer uniquement les inscriptions validées
inscriptionRouter.get('/statut/validees', verifierAdmin, getInscriptionsValidees);

// 📋 Inscriptions non validées (correspond à "en attente")
inscriptionRouter.get('/statut/en-attente', verifierAdmin, getInscriptionsEnAttente);

// 📋 Inscriptions refusées
inscriptionRouter.get('/statut/refusees', verifierAdmin, getInscriptionsRefusees);
// 📋 Inscriptions validées
inscriptionRouter.get('/statut/validees', verifierAdmin, getInscriptionsValidees);
// 📋 Inscriptions non validées
inscriptionRouter.get('/statut/non-validees', verifierAdmin, getInscriptionsNonValidees);

export default inscriptionRouter;

