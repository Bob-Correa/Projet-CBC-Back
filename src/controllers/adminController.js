import Admin from '../models/Admin.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

// Créer un nouvel admin (à utiliser avec précaution ou restreindre via un middleware)
 export const createAdmin = async (req, res) => {
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

export const loginAdmin = async (req, res) => {
  const { email, motDePasse } = req.body;

  try {
    const admin = await Admin.findOne({ email });
    if (!admin) return res.status(401).json({ message: 'Email ou mot de passe incorrect' });

    const estValide = await admin.verifierMotDePasse(motDePasse);
    if (!estValide) return res.status(401).json({ message: 'Email ou mot de passe incorrect' });

    // 🔐 Génération des tokens
    const accessToken = jwt.sign(
      { id: admin._id },
      process.env.JWT_SECRET,
      { expiresIn: '15m' }
    );

    const refreshToken = jwt.sign(
      { id: admin._id },
      process.env.REFRESH_SECRET,
      { expiresIn: '7d' }
    );

    // 🌐 stocker le refreshToken dans un cookie httpOnly
    res
      .cookie('refreshToken', refreshToken, {
        httpOnly: true,
        secure: true, // à activer en production
        sameSite: 'Strict',
        maxAge: 7 * 24 * 60 * 60 * 1000 // 7 jours
      })
      .status(200)
      .json({ accessToken });

  } catch (error) {
    console.error("❌ Erreur login admin :", error.message);
    res.status(500).json({ message: 'Erreur lors de la connexion' });
  }
};


// Afficher les infos de l'admin connecté
 export const getProfilAdmin = async (req, res) => {
  try {
    const admin = await Admin.findById(req.adminId).select('-motDePasse');
    if (!admin) return res.status(404).json({ message: 'Admin non trouvé' });
    res.status(200).json(admin);
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la récupération du profil' });
  }
};

export const refreshAccessToken = (req, res) => {
  const refreshToken = req.cookies.refreshToken;
  if (!refreshToken) {
    return res.status(401).json({ message: 'Aucun refresh token trouvé' });
  }

  try {
    const decoded = jwt.verify(refreshToken, process.env.REFRESH_SECRET);

    const newAccessToken = jwt.sign(
      { id: decoded.id },
      process.env.JWT_SECRET,
      { expiresIn: '15m' }
    );

    res.json({ accessToken: newAccessToken });
  } catch (err) {
    console.error('❌ Erreur de vérification du refresh token :', err.message);
    res.status(403).json({ message: 'Refresh token invalide ou expiré' });
  }
};
