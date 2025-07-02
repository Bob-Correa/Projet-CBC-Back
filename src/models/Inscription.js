import mongoose from 'mongoose';

const inscriptionSchema = new mongoose.Schema({
  nom: { type: String, required: true },
  prenom: { type: String, required: true }, 
  dateNaissance: Date,
  categorie: {
    type: String,
    required: true,
    enum: [ 'Baby basket', 'U7', 'U9', 'U11', 'U13', 'U15', 'U18', 'Seniors', 'Loisirs']
  },
  cotisation: {
    type: Number,
    required: true
  },
  nomRL1: { type: String, required: true }, // Responsable légal 1
  prenomRL1: { type: String, required: true }, // Prénom Responsable légal 1
  nomRL2: String, // Responsable légal 2 (optionnel)
  prenomRL2: String, // Prénom Responsable légal 2 (optionnel)
  emailRL1: { type: String, required: true }, // Email Responsable légal 1
  emailRL2: String, // Email Responsable légal 2 (optionnel)
  telephoneRL1: { type: String, required: true }, // Téléphone Responsable légal 1
  telephoneRL2: String, // Téléphone Responsable légal 2 (optionnel)    
  adresse: {
    type: String,
    required: true
  },
  codePostal: {
    type: String,
    required: true
  },
  ville: {
    type: String,
    required: true
  },
  commentaire: String,
  dateInscription: { type: Date, default: Date.now }, 
  email: { type: String, required: true },
  telephone: String,
  validee: { type: Boolean, default: false },
  dateValidation: Date,
  modePaiement: {
    type: [String],
    enum: ['Chèque', 'Espèces', 'Virement', 'Carte bancaire',' carte CJeune', 'Cheque CAF'],
    required: true
  },
  numeroCarteCJeune: String,    

});

export default mongoose.model('Inscription', inscriptionSchema);
