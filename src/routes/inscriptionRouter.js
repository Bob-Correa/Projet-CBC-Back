import express from 'express';
import { creerInscription,
     getInscriptions, 
     validerInscription,
     deleteInscription,
     getInscriptionById,
      getInscriptionsValidees, getInscriptionsNonValidees } from '../controllers/inscriptionController.js';
import { verifierAdmin } from '../middlewares/auth.js';

const router = express.Router();

router.post('/', creerInscription);
router.get('/', verifierAdmin, getInscriptions); // admin uniquement si besoin
// Voir une inscription en détail (admin only)
router.get('/:id', verifierAdmin, getInscriptionById);

// Supprimer une inscription (admin only)
router.delete('/:id', verifierAdmin, deleteInscription);

// Valider une inscription (admin only)
router.put('/:id/valider', verifierAdmin, validerInscription);
// Obtenir les inscriptions validées (admin only)
router.get('/validees', verifierAdmin, getInscriptionsValidees);
// Obtenir les inscriptions non validées (admin only)
router.get('/non-validees', verifierAdmin, getInscriptionsNonValidees);


export default router;
