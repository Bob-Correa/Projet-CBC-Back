import Panier from "../models/Panier.js";

// Ajouter un article ou en mettre à jour la quantité
export const ajouterOuMettreAJourArticle = async (req, res) => {
  const { utilisateur, produitId, quantite } = req.body;
  try {
    let panier = await Panier.findOne({ utilisateur });

    if (!panier) {
      panier = new Panier({
        utilisateur,
        items: [{ produit: produitId, quantite }]
      });
    } else {
      const index = panier.items.findIndex(item => item.produit == produitId);
      if (index >= 0) {
        panier.items[index].quantite += quantite;
      } else {
        panier.items.push({ produit: produitId, quantite });
      }
    }

    await panier.save();
    res.status(200).json(panier);
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de l'ajout au panier" });
  }
};

// Obtenir le panier d’un utilisateur
export const getPanier = async (req, res) => {
  try {
    const panier = await Panier.findOne({ utilisateur: req.params.utilisateur }).populate('items.produit');
    if (!panier) return res.status(404).json({ message: "Panier non trouvé" });
    res.status(200).json(panier);
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la récupération du panier" });
  }
};
// Supprimer un article du panier
export const supprimerArticleDuPanier = async (req, res) => {
  const { utilisateur, produitId } = req.body;
  try {
    const panier = await Panier.findOne({ utilisateur });
    if (!panier) return res.status(404).json({ message: "Panier non trouvé" });

    panier.items = panier.items.filter(item => item.produit != produitId);
    await panier.save();
    res.status(200).json(panier);
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la suppression de l'article du panier" });
  }
};
// Vider le panier d’un utilisateur
export const viderPanier = async (req, res) => {
  const { utilisateur } = req.body;
  try {
    const panier = await Panier.findOneAndDelete({ utilisateur });
    if (!panier) return res.status(404).json({ message: "Panier non trouvé" });
    res.status(200).json({ message: "Panier vidé avec succès" });
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la vidange du panier" });
  }
};
// Mettre à jour la quantité d’un article dans le panier
export const mettreAJourQuantiteArticle = async (req, res) => {
  const { utilisateur, produitId, quantite } = req.body;
  try {
    const panier = await Panier.findOne({ utilisateur });
    if (!panier) return res.status(404).json({ message: "Panier non trouvé" }); 
    const index = panier.items.findIndex(item => item.produit == produitId);
    if (index >= 0) {
      panier.items[index].quantite = quantite;
      await panier.save();
      res.status(200).json(panier);
    } else {
      res.status(404).json({ message: "Article non trouvé dans le panier" });
    }
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la mise à jour de la quantité" });
  }
};
// Obtenir tous les paniers (pour l'administration)
export const getAllPaniers = async (req, res) => {  
  try {
    const paniers = await Panier.find().populate('items.produit');
    res.status(200).json(paniers);
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la récupération des paniers" });
  }
}
// Supprimer un panier (pour l'administration)
export const supprimerPanier = async (req, res) => {
  const { utilisateur } = req.body;
  try {
    const panier = await Panier.findOneAndDelete({ utilisateur });
    if (!panier) return res.status(404).json({ message: "Panier non trouvé" });
    res.status(200).json({ message: "Panier supprimé avec succès" });
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la suppression du panier" });
  }
}
