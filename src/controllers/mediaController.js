// controllers/mediaController.js
import Album from '../models/Album.js';
import VideoMatch from '../models/VideosMatch.js';

export const createAlbum = async (req, res) => {
  try {
    const { titre, description, categorie } = req.body;
    const images = req.files.map(file => `/uploads/${file.filename}`);

    const album = new Album({
      titre,
      description,
      categorie,
      images,
      creePar: req.adminId
    });

    await album.save();
    res.status(201).json(album);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Erreur création album" });
  }
};

export const getAlbums = async (req, res) => {
  try {
    const albums = await Album.find().sort({ date: -1 });
    res.status(200).json(albums);
  } catch (err) {
    res.status(500).json({ message: "Erreur récupération albums" });
  }
};

export const createVideo = async (req, res) => {
  try {
    const { titre, url, equipe, matchDate, description } = req.body;

    const video = new VideoMatch({
      titre,
      url,
      equipe,
      matchDate,
      description,
      creePar: req.adminId
    });

    await video.save();
    res.status(201).json(video);
  } catch (err) {
    res.status(500).json({ message: "Erreur ajout vidéo" });
  }
};

export const getVideos = async (req, res) => {
  try {
    const videos = await VideoMatch.find().sort({ matchDate: -1 });
    res.status(200).json(videos);
  } catch (err) {
    res.status(500).json({ message: "Erreur récupération vidéos" });
  }
};
