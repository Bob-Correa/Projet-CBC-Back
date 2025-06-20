import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const adminSchema = new mongoose.Schema({
  nom: String,
  email: { type: String, required: true, unique: true },
  motDePasse: { type: String, required: true }
});

// Hachage du mot de passe avant sauvegarde
adminSchema.pre('save', async function (next) {
  if (!this.isModified('motDePasse')) return next();
  this.motDePasse = await bcrypt.hash(this.motDePasse, 10);
  next();
});

// Vérification du mot de passe
adminSchema.methods.verifierMotDePasse = function (mdp) {
  return bcrypt.compare(mdp, this.motDePasse);
};

export default mongoose.model('Admin', adminSchema);
