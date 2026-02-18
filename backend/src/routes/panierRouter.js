import express from 'express';
import { ajouterOuMettreAJourArticle, getPanier} from '../controllers/panierController.js';

const panierRouter = express.Router();

panierRouter.post('/', ajouterOuMettreAJourArticle);
panierRouter.get('/:utilisateur', getPanier);

export default panierRouter;

