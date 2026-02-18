import mongoose from "mongoose";

const matchSchema = new mongoose.Schema({
    equipeDomicile: {type: String, required: true},
    equipeExterieur: {type: String, required: true},
    date: {type: Date, required: true},
    heure: {type: String, required: true},
    lieu: {type: String, required: true},
    scoreDomicile: { type: Number, default: 0},
    scoreExterieur: { type: Number, default: 0},
    statut: {type: String, enum:["A venir","Terminé"], default:"A venir"},

});

export default mongoose.model('Match', matchSchema);