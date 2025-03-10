import mongoose from 'mongoose';

/**
 * Curriculum Review Schema
 * @typedef {Object} CurriculumReview
 * @property {string} review - The review of the curriculum
 * @property {number} score - The score of the curriculum
 * @property {string} feedback - The feedback of the curriculum
 */
const curriculumReviewSchema = new mongoose.Schema({
  review: {
    type: String,
    required: false
  },
  score: {
    type: Number,
    min: 0,
    max: 100,  // assuming a 0-100 score range
    required: false
  },
  feedback: {
    type: String,
    required: false
  },
  suggestions: {
    type: String,
    required: false
  }
}, { timestamps: true });  // Adds createdAt and updatedAt to each review



/**
 * Curriculum Schema
 * @typedef {Object} Curriculum
 * @property {string} name - The name of the curriculum
 * @property {string} path - The path of the curriculum
 * @property {string} status - The status of the curriculum
 * @property {string} data - The information in text format of the curriculum
 * @property {CurriculumReview[]} curriculumReview - The reviews of the curriculum
 */
const curriculumSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  path: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
  notes: {
    type: String,
    required: false,
  },
  data: {
    type: String,
    required: false,
  },
  curriculumReview: [curriculumReviewSchema],  // Using the defined review schema
  fileIdAi: {
    type: String,
    required: false,
  },
}, { timestamps: true });  // Adds createdAt and updatedAt to the main document

const Curriculum = mongoose.model('Curriculum', curriculumSchema);

export default Curriculum;
