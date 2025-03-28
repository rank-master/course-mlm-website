import mongoose, { Schema } from 'mongoose';

const referralConfigSchema = new Schema({
  courseId: { type: Schema.Types.ObjectId, ref: 'Course', default: null }, // null for global config
  firstSale: {
    seller: { type: Number, default: 0.8 },
    passive: { type: Number, default: 0.1 },
    superPassive: { type: Number, default: 0.05 },
  },
  subsequentSale: {
    seller: { type: Number, default: 0.6 },
    passive: { type: Number, default: 0.2 },
    superPassive: { type: Number, default: 0.1 },
  },
});

const ReferralConfig = mongoose.models.ReferralConfig || mongoose.model('ReferralConfig', referralConfigSchema);
export default ReferralConfig;