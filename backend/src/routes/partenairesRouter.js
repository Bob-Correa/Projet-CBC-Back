import express from 'express';
import {
  getPartenaires,
  createPartenaire,
  updatePartenaire,
  deletePartenaire
} from '../controllers/partenaireController.js';

const router = express.Router();

router.get('/', getPartenaires);
router.post('/', createPartenaire);
router.put('/:id', updatePartenaire);
router.delete('/:id', deletePartenaire);

export default router;
