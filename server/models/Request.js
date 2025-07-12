import mongoose from 'mongoose';

const requestSchema = new mongoose.Schema({
  sender: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  receiver: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  skillsOffered: [{ type: String }],
  skillsWanted: [{ type: String }],
  message: { type: String },
  status: { type: String, enum: ['pending', 'accepted', 'rejected'], default: 'pending' },
  scheduledTime: { type: Date },
  meetLink: { type: String },
}, { timestamps: true });

const Request = mongoose.model('Request', requestSchema);
export default Request; 