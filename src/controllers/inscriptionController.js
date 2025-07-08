import Inscription from '../models/Inscription.js';

// 🆕 Créer une inscription
export const creerInscription = async (req, res) => {
  try {
    const inscription = new Inscription(req.body);
    await inscription.save();
    res.status(201).json(inscription);
  } catch (err) {
    res.status(400).json({ message: 'Erreur lors de l’enregistrement', error: err.message });
  }
};

// 📥 Liste complète
export const getInscriptions = async (req, res) => {
  try {
    const { statut, ville, email, typeAdhesion } = req.query;
    const filtre = {};
    if (statut) filtre.statut = statut;
    if (ville) filtre.ville = new RegExp(ville, 'i');
    if (email) filtre.email = new RegExp(email, 'i');
    if (typeAdhesion) filtre.typeAdhesion = typeAdhesion;

    const inscriptions = await Inscription.find(filtre).sort({ createdAt: -1 });
    res.json(inscriptions);
  } catch (err) {
    res.status(500).json({ message: 'Erreur serveur', error: err.message });
  }
};

// 🔎 Détails par ID
export const getInscriptionById = async (req, res) => {
  try {
    const inscription = await Inscription.findById(req.params.id);
    if (!inscription) return res.status(404).json({ message: 'Inscription introuvable' });
    res.json(inscription);
  } catch (err) {
    res.status(500).json({ message: 'Erreur serveur', error: err.message });
  }
};

// 🖊️ Mise à jour
export const updateInscription = async (req, res) => {
  try {
    const updated = await Inscription.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ message: 'Inscription introuvable' });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ message: 'Échec de mise à jour', error: err.message });
  }
};

// ❌ Suppression
export const deleteInscription = async (req, res) => {
  try {
    const deleted = await Inscription.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Inscription introuvable' });
    res.json({ message: 'Inscription supprimée avec succès' });
  } catch (err) {
    res.status(500).json({ message: 'Erreur serveur', error: err.message });
  }
};

// ✅ Valider une inscription
export const validerInscription = async (req, res) => {
  try {
    const inscription = await Inscription.findById(req.params.id);
    if (!inscription) return res.status(404).json({ message: 'Introuvable' });
    if (inscription.statut === 'validée') {
      return res.status(400).json({ message: 'Déjà validée' });
    }
    inscription.statut = 'validée';
    await inscription.save();
    res.json({ message: 'Inscription validée' });
  } catch (err) {
    res.status(500).json({ message: 'Erreur serveur', error: err.message });
  }
};

// 🚫 Refuser une inscription
export const refuserInscription = async (req, res) => {
  try {
    const inscription = await Inscription.findById(req.params.id);
    if (!inscription) return res.status(404).json({ message: 'Introuvable' });
    inscription.statut = 'refusée';
    await inscription.save();
    res.json({ message: 'Inscription refusée' });
  } catch (err) {
    res.status(500).json({ message: 'Erreur serveur', error: err.message });
  }
};
// 📋 Obtenir les inscriptions validées
export const getInscriptionsValidees = async (req, res) => {
  try {
    const inscriptions = await Inscription.find({ statut: 'validée' }).sort({ createdAt: -1 });
    res.json(inscriptions);
  } catch (err) {
    res.status(500).json({ message: 'Erreur serveur', error: err.message });
  }
}
// 📋 Obtenir les inscriptions non validées
export const getInscriptionsNonValidees = async (req, res) => {
  try {
    const inscriptions = await Inscription.find({ statut: 'non validée' }).sort({ createdAt: -1 });
    res.json(inscriptions);
  } catch (err) {
    res.status(500).json({ message: 'Erreur serveur', error: err.message });
  }
}
// 📋 Obtenir les inscriptions refusées
export const getInscriptionsRefusees = async (req, res) => {
  try {
    const inscriptions = await Inscription.find({ statut: 'refusée' }).sort({ createdAt: -1 });
    res.json(inscriptions);
  } catch (err) {
    res.status(500).json({ message: 'Erreur serveur', error: err.message });
  }
}
// 📋 Obtenir les inscriptions en attente
export const getInscriptionsEnAttente = async (req, res) => {
  try {
    const inscriptions = await Inscription.find({ statut: 'en attente' }).sort({ createdAt: -1 });
    res.json(inscriptions);
  } catch (err) {
    res.status(500).json({ message: 'Erreur serveur', error: err.message });
  }
}
