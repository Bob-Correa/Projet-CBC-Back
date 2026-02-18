import mongoose from "mongoose";

const actualiteSchema = new mongoose.Schema({
    titre:{ type: String, required: true },
    contenu: {type: String, required: true},
    datePublication: { type: Date, default: Date.now},
    image: { type: String, default: null }, // Chemin de l'image
    slug: { type: String, unique: true, required: true }  


});
export default mongoose.model('Actualite',actualiteSchema);