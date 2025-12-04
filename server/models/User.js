const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
  name: { type: String },
  email: { type: String, required: true, unique: true, lowercase: true },
  passwordHash: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

// метод для установки пароля
UserSchema.methods.setPassword = async function(password) {
  this.passwordHash = await bcrypt.hash(password, 10);
};

// метод валидации пароля
UserSchema.methods.validatePassword = async function(password) {
  return bcrypt.compare(password, this.passwordHash);
};

// небольшой виртуал для вывода user-safe
UserSchema.methods.toClient = function() {
  return {
    id: this._id,
    name: this.name,
    email: this.email,
  };
};

module.exports = mongoose.model('User', UserSchema);
