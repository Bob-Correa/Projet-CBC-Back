import express from 'express';

import produitRouter from './produitRouter.js';
import panierRouter from './panierRouter.js';
import matchRouter from './matchRouter.js';
import actualiteRouter from './actualiteRouter.js';
import partenairesRouter from './partenairesRouter.js';
import adminRouter from './adminRouter.js';
import inscriptionRouter from './inscriptionRouter.js';
import calendrierRouter from './calendrierRouter.js';


const router = express.Router();

router.use('/produits', produitRouter);
router.use('/panier', panierRouter);
router.use('/matchs',matchRouter);
router.use('/actualites', actualiteRouter);
router.use('/partenaires', partenairesRouter);
router.use('/admin', adminRouter);
router.use('/inscriptions', inscriptionRouter);
router.use('/calendrier', calendrierRouter);


export default router;