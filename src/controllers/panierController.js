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


