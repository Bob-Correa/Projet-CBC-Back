import Calendrier from '../models/Calendrier.js';

// 🆕 Créer un événement
export const creerEvenement = async (req, res) => {
  try {
    const evenement = new Calendrier(req.body);
    await evenement.save();
    res.status(201).json(evenement);
  } catch (err) {
    res.status(400).json({ message: 'Erreur lors de la création', error: err.message });
  }
};

// 📋 Liste complète ou filtrée
export const getEvenements = async (req, res) => {
  try {
    const { typeEvenement, categorie, statut, visibilite } = req.query;
    const filtre = {};
    if (typeEvenement) filtre.typeEvenement = typeEvenement;
    if (categorie) filtre.categorie = categorie;
    if (statut) filtre.statut = statut;
    if (visibilite) filtre.visibilite = visibilite;

    const evenements = await Calendrier.find(filtre).sort({ dateDebut: 1 });
    res.json(evenements);
  } catch (err) {
    res.status(500).json({ message: 'Erreur serveur', error: err.message });
  }
};

// 🔎 Détails par ID
export const getEvenementById = async (req, res) => {
  try {
    const evenement = await Calendrier.findById(req.params.id);
    if (!evenement) return res.status(404).json({ message: 'Événement introuvable' });
    res.json(evenement);
  } catch (err) {
    res.status(500).json({ message: 'Erreur serveur', error: err.message });
  }
};

// ✏️ Mettre à jour un événement
export const updateEvenement = async (req, res) => {
  try {
    const updated = await Calendrier.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ message: 'Événement introuvable' });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ message: 'Échec de mise à jour', error: err.message });
  }
};

// ❌ Supprimer un événement
export const deleteEvenement = async (req, res) => {
  try {
    const deleted = await Calendrier.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Événement introuvable' });
    res.json({ message: 'Événement supprimé avec succès' });
  } catch (err) {
    res.status(500).json({ message: 'Erreur serveur', error: err.message });
  }
};
// 📅 Rechercher par date
export const getEvenementsByDate = async (req, res) => {
  try {
    const { date } = req.query;
    if (!date) return res.status(400).json({ message: 'Date requise' });

    const evenements = await Calendrier.find({ dateDebut: new Date(date) }).sort({ heureDebut: 1 });
    if (evenements.length === 0) return res.status(404).json({ message: 'Aucun événement trouvé pour cette date' });
    
    res.json(evenements);
  } catch (err) {
    res.status(500).json({ message: 'Erreur serveur', error: err.message });
  }
};
