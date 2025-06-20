import express from 'express';
import { getActualites, createActualite, updateActualite, deleteActualite } from '../controllers/actualiteController.js';
import { verifierAdmin } from '../middlewares/auth.js';

const actualiteRouter = express.Router();

actualiteRouter.get('/', getActualites);
actualiteRouter.post('/', verifierAdmin, createActualite);
actualiteRouter.put('/:id', verifierAdmin, updateActualite);
actualiteRouter.delete('/:id', verifierAdmin, deleteActualite);

export default actualiteRouter;

