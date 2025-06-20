import mongoose from "mongoose";

const produitSchema = new mongoose.Schema({
    nom: { type: String, required: true },
    description: String, prix: { type: Number, required: true },
    imageUrl: String, categorie: String, 
    stock: { type: Number, default: 0 },
    dateAjout: { type: Date, default: Date.now }
});

export default mongoose.model('Produit', produitSchema);
