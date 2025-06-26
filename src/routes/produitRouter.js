import express from 'express';
import {getProduits, createProduit, updateProduit, deleteProduit} from '../controllers/produitController.js';

const produitRouter = express.Router();

produitRouter.get('/', getProduits);
produitRouter.post('/', createProduit);
produitRouter.put('/:id', updateProduit);
produitRouter.delete('/:id', deleteProduit);

export default produitRouter;

