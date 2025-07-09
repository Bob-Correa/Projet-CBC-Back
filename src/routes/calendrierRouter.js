import express from 'express';
import {
  creerEvenement,
  getEvenements,
  getEvenementById,
  updateEvenement,
  deleteEvenement
} from '../controllers/calendrierController.js';

const calendrierRouter = express.Router();

calendrierRouter.post('/', creerEvenement);
calendrierRouter.get('/', getEvenements);
calendrierRouter.get('/:id', getEvenementById);
calendrierRouter.put('/:id', updateEvenement);
calendrierRouter.delete('/:id', deleteEvenement);

export default calendrierRouter;
