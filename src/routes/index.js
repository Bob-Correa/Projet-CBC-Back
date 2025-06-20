import {express} from 'express';

import produitRouter from './produitRouter';
import panierRouter from './panierRouter';
import matchRouter from './matchRouter';
import actualiteRouter from './actualiteRouter';

const router = express.Router();

router.use('/produits', produitRouter);
router.use('/panier', panierRouter);
router.use('/matchs',matchRouter);
router.use('/actualite', actualiteRouter);

export default router;