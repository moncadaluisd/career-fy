import path from 'path';
import { promises as fsPromises } from 'fs';
import { fileURLToPath } from 'url';

// Create equivalents for __dirname and __filename in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

import Curriculum from '../models/curriculum.js';
import { careerCoach } from '../assistants/careerCoach.js';
import { openaiService } from './openaiService.js';
import transformPdfToText from '../utils/transformPdfToText.js';
import { parseToJson } from '../utils/parseToJson.js';

/**
 * Get all curriculum
 * @returns {Promise<Curriculum[]>} The list of curriculum
 * @author: @moncadaluisd
 */
const getAllCurriculumService = async () => {
  const curriculum = await Curriculum.find();
  return curriculum;
};

/**
 * Create a curriculum
 * @param {Object} data
 * @param {string} data.name
 * @param {string} data.path
 * @returns {Promise<Curriculum>} The created curriculum
 * @author: @moncadaluisd
 */
const createCurriculumService = async ({ name, path }) => {
  const status = 'pending';
  const text = await transformPdfToText(path);
  const curriculum = await Curriculum.create({
    name,
    path,
    status,
    data: text,
  });
  return curriculum;
};

/**
 * Get a curriculum
 * @param {string} id
 * @returns {Promise<Curriculum>} The curriculum
 * @author: @moncadaluisd
 */
const getCurriculumService = async (id) => {
  const curriculum = await Curriculum.findById(id);


  return {
    ...curriculum._doc,
    curriculumReview: curriculum.curriculumReview.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)),
  };
};

/**
 * Delete a curriculum
 * @param {string} id
 * @returns {Promise<Curriculum>} The deleted curriculum
 * @author: @moncadaluisd
 */
const deleteCurriculumService = async (id) => {
  const curriculum = await getCurriculumService(id);
  if (!curriculum) {
    throw new Error('Curriculum not found');
  }
  await Curriculum.findByIdAndDelete(id);
  return curriculum;
};

/**
 * Get a review from a resume
 * @param {string} id
 * @returns {Promise<string>} The review
 * @author: @moncadaluisd
 */
const getReviewFromResumeService = async (id) => {
  const curriculum = await getCurriculumService(id);
  if (!curriculum) {
    throw new Error('Curriculum not found');
  }

  // get the last review
  const review =
    curriculum.curriculumReview[curriculum.curriculumReview.length - 1];
  return review;
};

/**
 * Generate a review from a resume
 * @param {string} id
 * @returns {Promise<string>} The review
 * @author: @moncadaluisd
 */
const generateCurriculumReviewService = async (id) => {
  const curriculum = await getCurriculumService(id);
  if (!curriculum) {
    throw new Error('Curriculum not found');
  }
  const text = curriculum.data;
  const assistant = careerCoach(text, false);
  const response = await openaiService(assistant);
  const parsedJson = parseToJson(response);
  const score = parsedJson.score;
  const feedback = parsedJson.feedback;
  const suggestions = parsedJson.suggestions;


  const review = {
    curriculum: curriculum._id,
    score,
    feedback,
    suggestions,
  };

  await Curriculum.findByIdAndUpdate(curriculum._id, {
    $push: {
      curriculumReview: review,
    },
  });

  return review;
};

/**
 * Show a curriculum pdf from path
 * @param {string} filePath
 * @returns {Promise<Buffer>} The pdf
 * @author: @moncadaluisd
 */
const showCurriculumPdfFromPathService = async (filePath) => {
  // Build the full path to the file
  const fullPath = path.join(__dirname, '..', '', filePath);
  const pdf = await fsPromises.readFile(fullPath);
  return pdf;
};

export {
  createCurriculumService,
  getAllCurriculumService,
  getCurriculumService,
  deleteCurriculumService,
  showCurriculumPdfFromPathService,

  // Review
  getReviewFromResumeService,
  generateCurriculumReviewService,
};
