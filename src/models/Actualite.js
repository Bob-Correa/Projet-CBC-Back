import mongoose from "mongoose";

const actualiteSchema = new mongoose.Schema({
    titre:{ type: String, required: true },
    contenu: {type: String, required: true},
    datePublication: { type: Date, default: Date.now},
    image: { type: String }, 
    slug: { type: String }  


});
export default mongoose.model('Actualite',actualiteSchema);