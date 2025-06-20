import express from "express";

import {getMatchs, createMatch, updateMatch} from "../controllers/matchController"
import { Router } from "express";

const matchRouter = Router();

matchRouter.get('/', getMatchs);
matchRouter.post('/',createMatch);
matchRouter.put('/:id', updateMatch)// Mettre a jour un match terminé(score)

export default {matchRouter}