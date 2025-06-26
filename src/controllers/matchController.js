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

