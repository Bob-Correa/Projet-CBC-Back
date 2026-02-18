import mongoose from 'mongoose';

const calendrierSchema = new mongoose.Schema({
  titre: { type: String, required: true },
  description: { type: String },
  lieu: { type: String },
  typeEvenement: {
    type: String,
    enum: ['entrainement', 'match', 'reunion', 'autre'],
    default: 'autre'
  },
  categorie: {
    type: String,
    enum: [
      'Baby Basket', 'U7', 'U9F', 'U9G', 'U11F', 'U11G', 'U13F', 'U13G',
      'U15F', 'U15G', 'U18F', 'U18G', 'Senior Femme', 'Senior Homme', 'Loisirs'
    ],
    required: false
  },
  dateDebut: { type: Date, required: true },
  dateFin: { type: Date },
  touteLaJournee: { type: Boolean, default: false },

  visibilite: {
    type: String,
    enum: ['publique', 'admin', 'privee'],
    default: 'publique'
  },

  statut: {
    type: String,
    enum: ['confirmé', 'reporté', 'annulé'],
    default: 'confirmé'
  },
  score: {
  type: String,
  default: ''
}

}, { timestamps: true });

export default mongoose.model('Calendrier', calendrierSchema);
// Ce modèle représente un événement dans le calendrier du club de basket.