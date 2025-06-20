import Actualite from "../models/Actualite";

const getActualites = async (req,res) => {
    try{
        const actualites = await Actualite.find().sort({datePublication:-1});
        res.status(200).json(actualites);
    }catch (error) {
        res.status(500).json({message: "Erreur serveur"});
    }
};

const createActualite = async (req, res) => {
    try {
        const { titre, contenu } = req.body;
        const nouvelleActualite = new Actualite({titre, contenu});
        await nouvelleActualite.save();
    }catch (error) {
        res.status(500).json({message: "Impossible d'ajouter l'actualité"});
}
};

export default {getActualites, createActualite}