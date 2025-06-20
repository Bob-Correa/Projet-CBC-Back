import express from 'express';
import { getActualites, createActualite, updateActualite, deleteActualite } from '../controllers/actualiteController.js';

const actualiteRouter = express.Router();

actualiteRouter.get('/', getActualites);
actualiteRouter.post('/', createActualite);
actualiteRouter.put('/:id', updateActualite);
actualiteRouter.delete('/:id', deleteActualite);

export default actualiteRouter;

