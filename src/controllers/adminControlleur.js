import Admin from '../models/admin.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

// Créer un nouvel admin (à utiliser avec précaution ou restreindre via un middleware)
 const createAdmin = async (req, res) => {
  const { nom, email, motDePasse } = req.body;

  try {
    const adminExiste = await Admin.findOne({ email });
    if (adminExiste) return res.status(400).json({ message: 'Email déjà utilisé' });

    const admin = new Admin({ nom, email, motDePasse });
    await admin.save();

    res.status(201).json({ message: 'Admin créé avec succès' });
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur lors de la création de l’admin' });
  }
};

// Connexion d’un admin et génération du token JWT
 const loginAdmin = async (req, res) => {
  const { email, motDePasse } = req.body;

  try {
    const admin = await Admin.findOne({ email });
    if (!admin) return res.status(401).json({ message: 'Email ou mot de passe incorrect' });

    const estValide = await admin.verifierMotDePasse(motDePasse);
    if (!estValide) return res.status(401).json({ message: 'Email ou mot de passe incorrect' });

    const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET, { expiresIn: '2h' });
    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la connexion' });
  }
};

// Optionnel : afficher les infos de l'admin connecté
 const getProfilAdmin = async (req, res) => {
  try {
    const admin = await Admin.findById(req.adminId).select('-motDePasse');
    if (!admin) return res.status(404).json({ message: 'Admin non trouvé' });
    res.status(200).json(admin);
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la récupération du profil' });
  }
};

export default {createAdmin,loginAdmin, getProfilAdmin}