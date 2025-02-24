import mongoose from 'mongoose';
import Apply from './applies';

const messageSchema = new mongoose.Schema({
  apply: {
    type: mongoose.Types.ObjectId,
    required: true,
    ref: Apply,
  },
  message: {
    type: String,
    default: '',
    required: true,
  },
  isAi: {
    type: Boolean,
    default: false,
  },
  sourceAi: {
    type: String,
    default: '',
  },
  modelAi: {
    type: String,
    default: '',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

const Message = mongoose.model('Message', messageSchema);

export default Message;
