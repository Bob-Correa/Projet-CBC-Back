import jwt from 'jsonwebtoken';

export const verifierAdmin = (req, res, next) => {
  const auth = req.headers.authorization;
  console.log("📥 Header Authorization reçu :", auth);

  if (!auth || !auth.startsWith('Bearer ')) {
    console.warn("⚠️ Aucun token ou mauvais format dans le header");
    return res.status(401).json({ message: 'Accès non autorisé' });
  }

  const token = auth.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("✅ Token décodé :", decoded);
    req.adminId = decoded.id;
    next();
  } catch (err) {
    console.error("❌ Token invalide :", err.message);
    res.status(401).json({ message: 'Token invalide' });
  }
};
export const requireRole = (role) => {
  return (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).json({ message: 'Token manquant' });

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      if (decoded.role !== role) {
        return res.status(403).json({ message: 'Accès interdit' });
      }
      req.adminId = decoded.id;
      req.role = decoded.role;
      next();
    } catch (err) {
      res.status(403).json({ message: 'Token invalide' });
    }
  };
};

