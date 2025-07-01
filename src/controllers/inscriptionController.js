import Inscription from '../models/Inscription.js';

 export const creerInscription = async (req, res) => {
  try {
    const inscription = new Inscription(req.body);
    await inscription.save();
    res.status(201).json({ message: 'Demande inscription enregistrée avec succès' });
  } catch (error) {
    res.status(400).json({ message: "Erreur lors de l'inscription", error });
  }
};

 export const getInscriptions = async (req, res) => {
  try {
    const inscriptions = await Inscription.find().sort({ dateInscription: -1 });
    res.status(200).json(inscriptions);
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

export const getInscriptionById = async (req, res) => {
  const inscription = await Inscription.findById(req.params.id);
  if (!inscription) return res.status(404).json({ message: "Inscription introuvable" });
  res.json(inscription);
};

export const deleteInscription = async (req, res) => {
  await Inscription.findByIdAndDelete(req.params.id);
  res.json({ message: "Inscription supprimée" });
};

export const validerInscription = async (req, res) => {
  const inscription = await Inscription.findById(req.params.id);
  if (!inscription) return res.status(404).json({ message: "Introuvable" });
  inscription.validee = true;
  await inscription.save();
  res.json({ message: "Inscription validée" });
  if (inscription.validee) {
  return res.status(400).json({ message: 'Inscription déjà validée' });
}

};
export const getInscriptionsValidees = async (req, res) => {
  try {
    const inscriptions = await Inscription.find({ validee: true }).sort({ dateInscription: -1 });
    res.status(200).json(inscriptions);
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur' });
  }
};
export const getInscriptionsNonValidees = async (req, res) => {
  try {
    const inscriptions = await Inscription.find({ validee: false }).sort({ dateInscription: -1 });
    res.status(200).json(inscriptions);
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur' });
  }
};
