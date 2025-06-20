import Produit from "../models/Produit";

// Obtenir tous les produits
const getProduits = async (req, res) => {
  try {
    const produits = await Produit.find().sort({ dateAjout: -1 });
    res.status(200).json(produits);
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur" });
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