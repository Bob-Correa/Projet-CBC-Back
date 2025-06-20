import mongoose from "mongoose";

const itemSchema = new mongoose.Schema({
  produit: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Produit',
    required: true
  },
  quantite: {
    type: Number,
    required: true,
    default: 1
  }
});

const panierSchema = new mongoose.Schema({
  utilisateur: {
    type: String, // Tu peux utiliser un `userId` plus tard si tu ajoutes un système d’auth
    required: true
  },
  items: [itemSchema],
  dateModif: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model('Panier',panierSchema)