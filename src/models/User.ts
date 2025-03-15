// src/models/User.ts
import mongoose, { Schema } from 'mongoose';

const userSchema = new Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name: { type: String },
  referralCode: {
    type: String,
    required: true,
    unique: true,
    default: () => `USER${Math.floor(1000 + Math.random() * 9000)}`,
  },
  balance: { type: Number, default: 0 },
  referredBy: { type: Schema.Types.ObjectId, ref: 'User', default: null }, // Who referred this user
  referredUsers: [{ type: Schema.Types.ObjectId, ref: 'User' }], // Users this user referred
  purchasedCourses: [{ type: Schema.Types.ObjectId, ref: 'Course' }],
  isAdmin: { type: Boolean, default: false }, // Added for admin access
}, { timestamps: true }); // Optional: adds createdAt/updatedAt fields

const User = mongoose.models.User || mongoose.model('User', userSchema);
export default User;