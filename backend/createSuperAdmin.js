// createSuperAdmin.js
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Admin from './src/models/Admin.js'; // Assurez-vous que le chemin est correct

dotenv.config();

const run = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ Connexion à MongoDB réussie');

    const existe = await Admin.findOne({ email: 'bob@monsite.fr' });
    if (existe) {
      console.log('⚠️ Superadmin déjà existant');
      return;
    }

    const bobSuperAdmin = new Admin({
      nom: 'Bob',
      email: 'bob@cbc.fr',
      motDePasse: 'Admincbc123',
      role: 'superadmin'
    });

    await bobSuperAdmin.save();
    console.log('🎉 Superadmin créé avec succès');
    process.exit();
  } catch (err) {
    console.error('❌ Erreur :', err.message);
    process.exit(1);
  }
};

run();
