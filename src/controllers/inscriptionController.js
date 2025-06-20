import Inscription from '../models/inscription.js';

 const creerInscription = async (req, res) => {
  try {
    const inscription = new Inscription(req.body);
    await inscription.save();
    res.status(201).json({ message: 'Demande inscription enregistrée avec succès' });
  } catch (error) {
    res.status(400).json({ message: "Erreur lors de l'inscription", error });
  }
};

 const getInscriptions = async (req, res) => {
  try {
    const inscriptions = await Inscription.find().sort({ dateInscription: -1 });
    res.status(200).json(inscriptions);
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

export default {creerInscription, getInscriptions}