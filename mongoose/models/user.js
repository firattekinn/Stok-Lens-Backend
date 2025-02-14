import mongoose from "mongoose";
import { mongoDB } from '../index.js'
import bcrypt from 'bcrypt';

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  email: { type: String, unique: true },
  password: { type: String },
}, { versionKey: false, autoIndex: true, timestamps: true });

UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();

  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (err) {
    next(err);
  }
});

UserSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

export const User = mongoDB.model("users", UserSchema);
