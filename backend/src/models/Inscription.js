import mongoose from 'mongoose';

const inscriptionSchema = new mongoose.Schema({

  typeAdhesion: {
  type: String,
  enum: ['Nouvelle', 'Renouvellement'],
  required: true
},

  nom: { type: String, required: true },
  prenom: { type: String, required: true },
  
  sexe: { type: String, enum: ['masculin', 'feminin'], required: true },
  dateNaissance: { type: Date, required: true },
  taille: { type: Number, required: true },
  categorie: { type: String, required: true },
  cotisation: { type: Number, required: true },
  NumeroMaillot: { type: String, required: true },

  adresse: { type: String, required: true },
  codePostal: { type: String, required: true },
  ville: { type: String, required: true },

  email: {
    type: String,
    validate: {
      validator: function (v) {
        // Si la personne est mineure, email peut être vide
        const age = new Date().getFullYear() - new Date(this.dateNaissance).getFullYear();
        return age < 18 ? true : v && v.length > 0;
      },
      message: 'Email requis pour les majeurs'
    }
  },
  telephone: {
    type: String,
    validate: {
      validator: function (v) {
        const age = new Date().getFullYear() - new Date(this.dateNaissance).getFullYear();
        return age < 18 ? true : v && v.length > 0;
      },
      message: 'Téléphone requis pour les majeurs'
    }
  },
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
