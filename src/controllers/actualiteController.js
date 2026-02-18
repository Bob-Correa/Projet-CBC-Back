import Actualite from "../models/Actualite.js";
import slugify from "slugify";

export const getActualites = async (req,res) => {
    try{
        const actualites = await Actualite.find().sort({datePublication:-1});
        res.status(200).json(actualites);
    }catch (error) {
        res.status(500).json({message: "Erreur serveur"});
    }
};

export async function getActualitesDernieres() {
  return await Actualite.find()
    .sort({ datePublication: -1 })
    .limit(11);
}


export const createActualite = async (req, res) => {
  try {
    const { titre, contenu } = req.body;
    
    if (!titre || !contenu) {
      return res.status(400).json({ message: "Titre et contenu requis." });
    }

    // Récupérer le chemin de l’image si elle existe
    const image = req.file
  ? `/uploads/${req.file.filename}`                    // 📤 image uploadée
  : req.body.image?.startsWith('/uploads/')
    ? req.body.image                                  // 📁 image existante
    : null;
    if (!image) {
      return res.status(400).json({ message: "Image requise." });
      
    }
    console.log("🖼️ Image uploadée :", req.file);
console.log("🗂️ Image depuis body :", req.body.image);

    const slug = slugify(titre, { lower: true, strict: true });

    const nouvelleActualite = new Actualite({ titre, contenu, image, slug });

    await nouvelleActualite.save();

    res.status(201).json(nouvelleActualite);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Impossible d'ajouter l'actualité" });
  }
  console.log("📎 Fichier reçu :", req.file);
  console.log("📝 Contenu de l'actualité :", req.body);
  console.log("🔗 Chemin de l'image :", req.file ? `/uploads/${req
.file.filename}` : "Aucune image");
  console.log("🔖 Slug généré :", slugify(titre, { lower  :true, strict: true }));
};


export const updateActualite = async (req, res) => {
    try {
        const { titre, contenu } = req.body;        
        const actualite = await Actualite.findByIdAndUpdate(req.params.id,{ titre, contenu }, { new: true });
        if (!actualite) return res.status(404).json({ message: "Actualité non trouvée" });
        res.status(200).json(actualite);
    } catch (error) {
        res.status(400).json({ message: "Erreur lors de la mise à jour" });
  }
};

 export const deleteActualite = async (req, res) => {
      try {
          const actualite = await Actualite.findByIdAndDelete(req.params.id);
          if (!actualite) 
            return res.status(404).json({ message: "Actualité non trouvée" });

          res.status(200).json({ message: "Actualité supprimée avec succès" });
      } catch (error) {
          res.status(400).json({ message: "Erreur lors de la suppression." });
      }
};
export const getActualiteById = async (req, res) => {
  try {
    const actualite = await Actualite.findById(req.params.id);
    if (!actualite) {
      return res.status(404).json({ message: "Actualité introuvable" });
    }
    res.json(actualite);
  } catch (err) {
    console.error("❌ Erreur serveur :", err);
    res.status(500).json({ message: "Erreur serveur" });
  }
};
export const getActualiteBySlug = async (req, res) => {
  try {
    const actualite = await Actualite.findOne({ slug: req.params.slug });
    if (!actualite) return res.status(404).json({ message: "Actualité non trouvée" });
    res.status(200).json(actualite);
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la récupération de l'actualité" });
  }
};
export const getActualitesByDate = async (req, res) => {
  try {
    const actualites = await Actualite.find().sort({ datePublication: -1 });
    res.status(200).json(actualites);
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur" });
  }
};
export const getActualitesByTitre = async (req, res) => {
  try {
    const actualites = await Actualite.find({ titre: new RegExp(req.params.titre, 'i') });
    if (!actualites.length) return res.status(404).json({ message: "Aucune actualité trouvée" });
    res.status(200).json(actualites);
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la recherche d'actualités" });
  }
};

