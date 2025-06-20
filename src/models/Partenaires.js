import mongoose from 'mongoose';

const partenaireSchema = new mongoose.Schema({
  nom: { type: String, required: true },
  logoUrl: String,
  siteWeb: String,
  description: String,
  ordre: Number, // pour gérer l'affichage dans un certain ordre
  dateAjout: { type: Date, default: Date.now }
});

export default mongoose.model('Partenaire', partenaireSchema);
