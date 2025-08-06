import Joi from 'joi';
import Inscription from '../models/Inscription.js';
import PDFDocument from 'pdfkit';
import dayjs from 'dayjs';


const estMineur = (date) => {
  return dayjs().diff(dayjs(date), 'year') < 18;
};

// Validation schema for inscription
export const inscriptionSchema = Joi.object({
  statut: Joi.string().valid("en attente", "validée", "refusée").default("en attente"),
  typeAdhesion: Joi.string().valid("Nouvelle", "Renouvellement").required(),
  nom: Joi.string().min(2).required(),
  prenom: Joi.string().min(2).required(),
  sexe: Joi.string().valid("masculin", "feminin").required(),
  dateNaissance: Joi.date().greater('1-1-1950').required(),
  categorie: Joi.string().required(),
  cotisation: Joi.number().required(),
  adresse: Joi.string().required(),
  codePostal: Joi.string().length(5).pattern(/^\d+$/).required(),
  ville: Joi.string().required(),
  // 👇 Email conditionnel selon dateNaissance
  email: Joi.alternatives().conditional('dateNaissance', {
    is: Joi.date().greater('1-1-1950').less(dayjs().subtract(18, 'year').toDate()),
    then: Joi.string().email().required(),
    otherwise: Joi.string().email().allow('').optional()
  }),
  telephone: Joi.alternatives().conditional('dateNaissance', {
    is: Joi.date().greater('1-1-1950').less(dayjs().subtract(18, 'year').toDate()),
    then: Joi.string().length(10).pattern(/^\d+$/).required(),
    otherwise: Joi.string().allow('').optional()
  }),
  commentaire: Joi.string().allow(''),
  modePaiement: Joi.array().items(Joi.string()).required(),
  numeroCarteCJeune: Joi.string().allow(''),
  representants: Joi.array().items(
    Joi.object({
      nom: Joi.string().min(2).required(),
      prenom: Joi.string().min(2).required(),
      email: Joi.string().email().required(),
      telephone: Joi.string().length(10).pattern(/^\d+$/).required()
    
    })

  )
});


// 🆕 Créer une inscription
export const creerInscription = async (req, res) => {
  const { error, value } = inscriptionSchema.validate(req.body, { abortEarly: false });

  if (error) {
    const messages = error.details.map(detail => detail.message);
    return res.status(400).json({ message: messages.join(" | ") });
  }

  try {
    const inscription = new Inscription(value); // 👈 utilise les données validées
    await inscription.save();
    res.status(201).json(inscription);
  } catch (err) {
  console.error("🧨 Erreur backend :", err); // Log complet
  res.status(500).json({ message: "Erreur lors de l’enregistrement", error: err.message });
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
// 📄 Exporter une inscription en PDF
export const exportInscriptionPDF = async (req, res) => {
  try {
    const inscription = await Inscription.findById(req.params.id);
    if (!inscription) return res.status(404).json({ message: 'Inscription introuvable' });

    const doc = new PDFDocument();
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename=inscription_${inscription.nom}.pdf`);
    doc.pipe(res);

    doc.fontSize(18).text('📋 Fiche d’inscription', { align: 'center' });
    doc.moveDown();

    doc.fontSize(12);
    doc.text(`Nom : ${inscription.nom}`);
    doc.text(`Prénom : ${inscription.prenom}`);
    doc.text(`Sexe : ${inscription.sexe}`);
    doc.text(`Date de naissance : ${new Date(inscription.dateNaissance).toLocaleDateString()}`);
    doc.text(`Catégorie : ${inscription.categorie}`);
    doc.text(`Cotisation : ${inscription.cotisation} €`);
    doc.text(`Type d’adhésion : ${inscription.typeAdhesion}`);
    doc.text(`Email : ${inscription.email}`);
    doc.text(`Téléphone : ${inscription.telephone}`);
    doc.text(`Adresse : ${inscription.adresse}, ${inscription.codePostal} ${inscription.ville}`);
    doc.text(`Modes de paiement : ${inscription.modePaiement.join(', ')}`);

    if (inscription.numeroCarteCJeune) {
      doc.text(`Carte CJeune : ${inscription.numeroCarteCJeune}`);
    }

    if (inscription.representants && inscription.representants.length > 0) {
      doc.moveDown();
      doc.text('👨‍👩‍👧 Représentants légaux :');
      inscription.representants.forEach((rl, index) => {
        doc.text(`- RL${index + 1} : ${rl.prenom} ${rl.nom}, ${rl.email}, ${rl.telephone}`);
      });
    }

    doc.end();
  } catch (err) {
    res.status(500).json({ message: 'Erreur lors de la génération du PDF', error: err.message });
  }
};

