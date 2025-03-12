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
 */
const getCurriculumService = async (id) => {
  const curriculum = await Curriculum.findById(id);
  return curriculum;
};

/**
 * Delete a curriculum
 * @param {string} id
 * @returns {Promise<Curriculum>} The deleted curriculum
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
 */
const getReviewFromResumeService = async (id) => {
  const curriculum = await getCurriculumService(id);
  if (!curriculum) {
    throw new Error('Curriculum not found');
  }
  const text = await transformPdfToText(curriculum.path);
  const assistant = careerCoach(text, false);
  const response = await openaiService(assistant);
  const parsedJson = parseToJson(response);
  return parsedJson;
};

/**
 * Show a curriculum pdf from path
 * @param {string} filePath
 * @returns {Promise<Buffer>} The pdf
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
  getReviewFromResumeService,
  showCurriculumPdfFromPathService,
};
