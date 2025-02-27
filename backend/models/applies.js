import mongoose from 'mongoose';
import { APPLY_STATUS } from '../config/constants.js';

/**
 * Apply Schema
 * @typedef {Object} Apply
 * @property {string} url - The URL of the apply
 * @property {string} name - The name of the apply
 * @property {string} description - The description of the apply
 * @property {string} status - The status of the apply
 * @property {string[]} tags - The tags of the apply
 * @property {string} location - The location of the apply
 * @property {string} typeWork - The type of work of the apply
 * @property {string} salary - The salary of the apply
 * @property {string} company - The company of the apply
 * @property {Date} createdAt - The created at date of the apply
 * @property {Date} updatedAt - The updated at date of the apply
 */
const applySchema = new mongoose.Schema(
  {
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
  },
  { timestamps: true },
);

const Apply = mongoose.model('Apply', applySchema);

export default Apply;
