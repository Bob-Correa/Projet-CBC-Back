import {express} from 'express';

import produitRouter from './produitRouter';
import panierRouter from './panierRouter';
import matchRouter from './matchRouter';
import actualiteRouter from './actualiteRouter';
import partenaireRoutes from './partenaireRoutes.js';
import adminRouter from './adminRoutes.js';
import inscriptionRoutes from './inscriptionRoutes.js';

const router = express.Router();

router.use('/produits', produitRouter);
router.use('/panier', panierRouter);
router.use('/matchs',matchRouter);
router.use('/actualites', actualiteRouter);
router.use('/partenaires', partenaireRoutes);
router.use('/admin', adminRouter);
router.use('/inscriptions', inscriptionRoutes);

export default router;