// models/Album.js
import mongoose from 'mongoose';

const albumSchema = new mongoose.Schema({
  titre: { type: String, required: true },
  description: String,
  categorie: String,
  date: { type: Date, default: Date.now },
  images: [String], // chemins des fichiers images
  creePar: { type: mongoose.Schema.Types.ObjectId, ref: 'Admin' }
});

export default mongoose.model('Album', albumSchema);
