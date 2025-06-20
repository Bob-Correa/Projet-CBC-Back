import express from 'express';
import { creerInscription, getInscriptions } from '../controllers/inscriptionController.js';
import { verifierAdmin } from '../middlewares/auth.js';

const router = express.Router();

router.post('/', creerInscription);
router.get('/', verifierAdmin, getInscriptions); // admin uniquement si besoin

export default router;
