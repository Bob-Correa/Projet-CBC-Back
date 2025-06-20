import Partenaire from '../models/partenaire.js';

export const getPartenaires = async (req, res) => {
  try {
    const partenaires = await Partenaire.find().sort({ ordre: 1 });
    res.status(200).json(partenaires);
  } catch (err) {
    res.status(500).json({ message: "Erreur lors du chargement des partenaires" });
  }
};

export const createPartenaire = async (req, res) => {
  try {
    const partenaire = new Partenaire(req.body);
    await partenaire.save();
    res.status(201).json(partenaire);
  } catch (err) {
    res.status(400).json({ message: "Erreur lors de la création du partenaire" });
  }
};

export const updatePartenaire = async (req, res) => {
  try {
    const partenaire = await Partenaire.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!partenaire) return res.status(404).json({ message: "Partenaire non trouvé" });
    res.status(200).json(partenaire);
  } catch (err) {
    res.status(400).json({ message: "Erreur lors de la mise à jour" });
  }
};

export const deletePartenaire = async (req, res) => {
  try {
    const partenaire = await Partenaire.findByIdAndDelete(req.params.id);
    if (!partenaire) return res.status(404).json({ message: "Partenaire non trouvé" });
    res.status(200).json({ message: "Partenaire supprimé avec succès" });
  } catch (err) {
    res.status(500).json({ message: "Erreur serveur" });
  }
};
