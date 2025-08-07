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

// Toutes les actualités
actualiteRouter.get('/', getActualites);

// Par ID
actualiteRouter.get('/:id', getActualiteById);

// Par slug
actualiteRouter.get('/slug/:slug', getActualiteBySlug);

// Par titre
actualiteRouter.get('/titre/:titre', getActualitesByTitre);

// Par date
actualiteRouter.get('/date/:date', getActualitesByDate);

// Création
actualiteRouter.post('/', verifierAdmin, upload.single('image'), createActualite);

// Mise à jour
actualiteRouter.put('/:id', verifierAdmin, updateActualite);

// Suppression
actualiteRouter.delete('/:id', verifierAdmin, deleteActualite);


export default actualiteRouter;

