// models/VideoMatch.js
import mongoose from 'mongoose';

const videoSchema = new mongoose.Schema({
  titre: String,
  url: String, // lien YouTube, Vimeo, etc.
  equipe: [String],
  matchDate: Date,
  description: String,
  creePar: { type: mongoose.Schema.Types.ObjectId, ref: 'Admin' }
});

export default mongoose.model('VideoMatch', videoSchema);
