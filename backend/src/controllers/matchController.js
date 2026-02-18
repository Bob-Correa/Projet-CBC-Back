import Match from "../models/Match.js";

export const getMatchs = async (req, res) => {
    try{
        const matchs = await Match.find().sort({date:1});
        res.status(200).json(matchs);    
    }catch (error) {
        res.status(500).json({message: "Erreur serveur"});
    }
};

export const createMatch = async (req, res) => {
    try {
        const { equipeDomicile, equipeExterieur, date, heure, lieu } = req.body;
        const nouveauMatch = new Match({
      equipeDomicile,
      equipeExterieur,
      date,
      heure,
      lieu,
    });

    await nouveauMatch.save();
    res.status(201).json(nouveauMatch);
  } catch (error) {
    res.status(400).json({ message: "Erreur lors de la création du match" });
  }
};

export const updateMatch = async (req, res) => {
  try {
    const { id } = req.params;
    const { equipeDomicile, equipeExterieur, date, heure, lieu } = req.body;

    const matchMisAJour = await Match.findByIdAndUpdate(
      id,
      { equipeDomicile, equipeExterieur, date, heure, lieu },
      { new: true }
    );

    if (!matchMisAJour) {
      return res.status(404).json({ message: "Match non trouvé" });
    }

    res.status(200).json(matchMisAJour);
  } catch (error) {
    res.status(400).json({ message: "Erreur lors de la mise à jour du match" });
  }
};
export const deleteMatch = async (req, res) => {
  try {
    const { id } = req.params;
    const matchSupprime = await Match.findByIdAndDelete(id);

    if (!matchSupprime) {
      return res.status(404).json({ message: "Match non trouvé" });
    }

    res.status(200).json({ message: "Match supprimé avec succès" });
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur lors de la suppression du match" });
  }
};
export const getMatchById = async (req, res) => {
  try {
    const { id } = req.params;
    const match = await Match.findById(id);
    if (!match) {
      return res.status(404).json({ message: "Match non trouvé" });
    }
    res.status(200).json(match);
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur lors de la récupération du match" });
  }
};
export const getMatchsByDate = async (req, res) => {
  try {
    const { date } = req.params;
    const matchs = await Match.find({ date: new Date(date) }).sort({ heure: 1 });
    if (matchs.length === 0) {
      return res.status(404).json({ message: "Aucun match trouvé pour cette date" });
    }
    res.status(200).json(matchs);
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur lors de la récupération des matchs" });
  }
};
export const getMatchsByLieu = async (req, res) => {
  try {
    const { lieu } = req.params;
    const matchs = await Match.find({ lieu: new RegExp(lieu, 'i') }).sort({ date: 1 });
    if (matchs.length === 0) {
      return res.status(404).json({ message: "Aucun match trouvé pour ce lieu" });
    }
    res.status(200).json(matchs);
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur lors de la récupération des matchs" });
  }
}
export const getMatchsByEquipe = async (req, res) => {
  try {
    const { equipe } = req.params;
    const matchs = await Match.find({
      $or: [
        { equipeDomicile: new RegExp(equipe, 'i') },
        { equipeExterieur: new RegExp(equipe, 'i') }
      ]
    }).sort({ date: 1 });

    if (matchs.length === 0) {
      return res.status(404).json({ message: "Aucun match trouvé pour cette équipe" });
    }
    res.status(200).json(matchs);
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur lors de la récupération des matchs" });
  }
} 



