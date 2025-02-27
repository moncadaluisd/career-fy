import mongoose from 'mongoose';
import Apply from './applies';

/**
 * Message Schema
 * @typedef {Object} Message
 * @property {Apply} apply - The apply object
 * @property {string} message - The message
 * @property {boolean} isAi - Whether the message is from AI
 * @property {string} sourceAi - The source of the message
 * @property {string} modelAi - The model of the message
 * @property {Date} createdAt - The created at date of the message
 * @property {Date} updatedAt - The updated at date of the message
 */
const messageSchema = new mongoose.Schema(
  {
    apply: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: Apply,
    },

    userMessage: {
      type: String,
      required: true,
    },
    answerAi: {
      type: String,
      required: false,
    },
    sourceAi: {
      type: String,
      required: false,
    },
    modelAi: {
      type: String,
      required: false,
    },
    type: {
      type: String,
      required: false,
    },
  },
  { timestamps: true },
);

const Message = mongoose.model('Message', messageSchema);

export default Message;
