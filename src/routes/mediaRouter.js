// routes/mediaRouter.js
import express from 'express';
import { verifierAdmin } from '../middlewares/auth.js';
import { upload } from '../middlewares/upload.js';
import {
  createAlbum,
  getAlbums,
  createVideo,
  getVideos
} from '../controllers/mediaController.js';

const mediarouter = express.Router();

mediarouter.post('/albums', verifierAdmin, upload.array('images', 10), createAlbum);
mediarouter.get('/albums', getAlbums);

mediarouter.post('/videos', verifierAdmin, createVideo);
mediarouter.get('/videos', getVideos);

export default mediarouter;
