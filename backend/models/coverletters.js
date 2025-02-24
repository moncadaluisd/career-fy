import mongoose from 'mongoose';
import Apply from './applies.js';
import Curriculum from './curriculum.js';

const coverletterSchema = new mongoose.Schema({
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
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

const Coverletter = mongoose.model('Coverletter', coverletterSchema);

export default Coverletter;
