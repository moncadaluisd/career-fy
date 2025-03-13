import mongoose from 'mongoose';
import Apply from './applies.js';
import Curriculum from './curriculum.js';

/**
 * ConverLetterMessages Schemax
 * @typedef {Object} ConverLetterMessages
 * @property {string} message - The message
 */
const converLetterMessagesSchema = new mongoose.Schema(
  {
    message: {
      type: String,
      required: true,
    },
    text: {
      type: String,
      required: false,
    },
  },
  { timestamps: true },
);

/**
 * Coverletter Schema
 * @typedef {Object} Coverletter
 * @property {string} text - The text of the coverletter
 * @property {Apply} apply - The apply object
 * @property {Curriculum} curriculum - The curriculum object
 * @property {boolean} isShort - Whether the coverletter is short
 * @property {number} version - The version of the coverletter
 * @property {Date} createdAt - The created at date of the coverletter
 * @property {Date} updatedAt - The updated at date of the coverletter
 */
const coverletterSchema = new mongoose.Schema(
  {
    text: {
      type: String,
      required: true,
    },
    apply: {
      type: mongoose.Types.ObjectId,
      ref: Apply,
      required: true,
    },
    curriculum: {
      type: mongoose.Types.ObjectId,
      ref: Curriculum,
      required: true,
    },
    isShort: {
      type: Boolean,
      default: false,
    },
    version: {
      type: Number,
      default: 1,
    },
    message: [converLetterMessagesSchema],
  },
  { timestamps: true },
);

const Coverletter = mongoose.model('Coverletter', coverletterSchema);

export default Coverletter;
