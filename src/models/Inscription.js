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
