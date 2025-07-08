import mongoose from 'mongoose';

const inscriptionSchema = new mongoose.Schema({

  typeAdhesion: {
  type: String,
  enum: ['nouvelle', 'renouvellement'],
  required: true
},

  nom: { type: String, required: true },
  prenom: { type: String, required: true },
  sexe: {
    type: String,
    enum: ['masculin', 'feminin'],
    required: true
  },
  sexe: { type: String, enum: ['masculin', 'feminin'], required: true },
  dateNaissance: { type: Date, required: true },
  categorie: { type: String, required: true },
  cotisation: { type: Number, required: true },

  adresse: { type: String, required: true },
  codePostal: { type: String, required: true },
  ville: { type: String, required: true },

  email: { type: String, required: true, lowercase: true, trim: true },
  telephone: { type: String, required: true },
  commentaire: { type: String },
  

  modePaiement: [{
    type: String,
    enum: [
      'Chèque',
      'Espèces',
      'Virement',
      'Carte bancaire',
      'carte CJeune',
      'Chèque CAF'
    ]
  }],
  numeroCarteCJeune: { type: String },

  representants: [{
    nom: String,
    prenom: String,
    email: String,
    telephone: String
  }],

  statut: {
    type: String,
    enum: ['en attente', 'validée', 'refusée'],
    default: 'en attente'
  },
}, { timestamps: true });

export default mongoose.model('Inscription', inscriptionSchema);
