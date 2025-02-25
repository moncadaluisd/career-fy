import mongoose from 'mongoose';
import { APPLY_STATUS } from '../config/constants.js';

const applySchema = new mongoose.Schema({
  url: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
    default: APPLY_STATUS.PENDING,
  },
  tags: {
    type: [String],
    required: false,
  },
  location: {
    type: String,
    required: false,
  },
  typeWork: {
    type: String,
    required: false,
  },
  salary: {
    type: String,
    required: false,
  },
  company: {
    type: String,
    required: false,
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

  const Apply = mongoose.model('Apply', applySchema);

export default Apply;
