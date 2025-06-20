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
const updateActualite = async (req, res) => {
  try {
    const actualite = await Actualite.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!actualite) return res.status(404).json({ message: "Actualité non trouvée" });
    res.status(200).json(actualite);
  } catch (error) {
    res.status(400).json({ message: "Erreur lors de la mise à jour" });
  }
};

 const deleteActualite = async (req, res) => {
  try {
    const actualite = await Actualite.findByIdAndDelete(req.params.id);
    if (!actualite) return res.status(404).json({ message: "Actualité non trouvée" });
    res.status(200).json({ message: "Actualité supprimée avec succès" });
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur" });
  }
};
export default {getActualites, createActualite, updateActualite, deleteActualite}