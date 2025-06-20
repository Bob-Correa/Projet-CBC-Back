import mongoose from "mongoose";

const actualiteSchema = new mongoose.Schema({
    titre:{ type: String, required: true },
    contenu: {type: String, required: true},
    datePublication: { type: Date, default: Date.now}


});
export default mongoose.model('Actualite',actualiteSchema);