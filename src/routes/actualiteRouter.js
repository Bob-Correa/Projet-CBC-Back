import express from 'express';
import { getActualites, 
  createActualite,
  updateActualite, 
  deleteActualite, 
  getActualitesDernieres, 
  getActualiteBySlug, 
  getActualitesByTitre,
  getActualitesByDate,
  getActualiteById } from '../controllers/actualiteController.js';
import { verifierAdmin } from '../middlewares/auth.js';
import { upload  } from '../middlewares/upload.js';

const actualiteRouter = express.Router();

actualiteRouter.get('/derniere', async (req, res) => {
  try {
    const actus = await getActualitesDernieres();
    res.json(actus);
  } catch (err) {
    res.status(500).json({ message: "Erreur serveur 😢" });
  }
});

actualiteRouter.get('/', getActualites, getActualiteById, getActualiteBySlug, getActualitesByTitre, getActualitesByDate);
actualiteRouter.post('/', verifierAdmin,upload.single('image'), createActualite);
actualiteRouter.put('/:id', verifierAdmin, updateActualite);
actualiteRouter.delete('/:id', verifierAdmin, deleteActualite);

export default actualiteRouter;

