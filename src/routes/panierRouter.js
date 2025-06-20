import { Router } from "express";
import { ajouterOuMettreAJourArticle, getPanier} from '../controllers/panierController';
const panierRouter = Router();

panierRouter.post('/', ajouterOuMettreAJourArticle);
panierRouter.get('/:utilisateur', getPanier);

export default {panierRouter}

