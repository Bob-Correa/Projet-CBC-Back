import Produit from "../models/Produit";

// Obtenir tous les produits
const getProduits = async (req, res) => {
  try {
    const { categorie, minPrix, maxPrix, enStock, recherche } = req.query;

    let filtre = {};

    if (categorie) {
      filtre.categorie = categorie;
    }

    if (minPrix || maxPrix) {
      filtre.prix = {};
      if (minPrix) filtre.prix.$gte = Number(minPrix);
      if (maxPrix) filtre.prix.$lte = Number(maxPrix);
    }

    if (enStock === 'true') {
      filtre.stock = { $gt: 0 };
    }

    if (recherche) {
      filtre.nom = { $regex: recherche, $options: 'i' }; // recherche partielle insensible à la casse
    }

    const produits = await Produit.find(filtre).sort({ dateAjout: -1 });
    res.status(200).json(produits);
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la récupération des produits" });
  }
};


// Ajouter un nouveau produit
const createProduit = async (req, res) => {
  try {
    const { nom, description, prix, imageUrl, categorie, stock } = req.body;
    const nouveauProduit = new Produit({ nom, description, prix, imageUrl, categorie, stock });
    await nouveauProduit.save();
    res.status(201).json(nouveauProduit);
  } catch (error) {
    res.status(400).json({ message: "Erreur lors de la création du produit" });
  }
};

// Mettre à jour un produit
const updateProduit = async (req, res) => {
  try {
    const { id } = req.params;
    const produitMaj = await Produit.findByIdAndUpdate(id, req.body, { new: true });
    if (!produitMaj) return res.status(404).json({ message: "Produit non trouvé" });
    res.status(200).json(produitMaj);
  } catch (error) {
    res.status(400).json({ message: "Erreur lors de la mise à jour du produit" });
  }
};

// Supprimer un produit
const deleteProduit = async (req, res) => {
  try {
    const produitSupprimé = await Produit.findByIdAndDelete(req.params.id);
    if (!produitSupprimé) return res.status(404).json({ message: "Produit non trouvé" });
    res.status(200).json({ message: "Produit supprimé avec succès" });
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la suppression du produit" });
  }
};

export default {getProduits, createProduit, updateProduit, deleteProduit}