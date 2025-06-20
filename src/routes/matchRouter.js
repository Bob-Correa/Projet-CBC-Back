import express from "express";

import {getMatchs, createMatch, updateMatch} from "../controllers/matchController"


const matchRouter = express.Router();

matchRouter.get('/', getMatchs);
matchRouter.post('/',createMatch);
matchRouter.put('/:id', updateMatch)// Mettre a jour un match terminé(score)

export default matchRouter;