import express from 'express';
import { ajouterOuMettreAJourArticle, getPanier} from '../controllers/panierController';

const panierRouter = express.Router();

panierRouter.post('/', ajouterOuMettreAJourArticle);
panierRouter.get('/:utilisateur', getPanier);

export default panierRouter;

