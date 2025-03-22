import fs from 'fs/promises';
import { validationResult } from 'express-validator';
import { handleApi, handleApiError } from '../middleware/handleApi.js';
import {
  createCurriculumService,
  deleteCurriculumService,
  generateCurriculumReviewService,
  getAllCurriculumService,
  getCurriculumService,
  getReviewFromResumeService,
  showCurriculumPdfFromPathService,
} from '../services/curriculumService.js';
import path from 'path';

/**
 * Create a curriculum
 * @param {Object} req - The request object
 * @param {Object} res - The response object
 * @param {Function} next - The next middleware function
 * @author: @moncadaluisd
 */
const createCurriculum = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const error = errors.array();
      return handleApiError(res, error, 422, 'Validation error');
    }

    const { name } = req.body;
    const file = req.file;

    if (!file) {
      return handleApiError(res, 'File is required', 422, 'Validation error');
    }

    const nameFile = file.filename;

    const path = `uploads/${nameFile}`;

    const curriculum = await createCurriculumService({
      name,
      path,
    });
    handleApi(res, curriculum, 201, 'Curriculum created successfully');
  } catch (error) {
    handleApiError(res, error.stack);
  }
};

/**
 * Get all curriculum
 * @param {Object} req - The request object
 * @param {Object} res - The response object
 * @param {Function} next - The next middleware function
 * @author: @moncadaluisd
 */
const getAllCurriculum = async (req, res, next) => {
  try {
    const curriculum = await getAllCurriculumService();
    handleApi(res, curriculum);
  } catch (error) {
    handleApiError(res, error.stack, 500, error.message);
  }
};

/**
 * Get a curriculum
 * @param {Object} req - The request object
 * @param {Object} res - The response object
 * @param {Function} next - The next middleware function
 * @author: @moncadaluisd
 */
const getCurriculum = async (req, res, next) => {
  try {
    const { id } = req.params;
    const curriculum = await getCurriculumService(id);
    handleApi(res, curriculum);
  } catch (error) {
    handleApiError(res, error.stack, 500, error.message);
  }
};

/**
 * Delete a curriculum
 * @param {Object} req - The request object
 * @param {Object} res - The response object
 * @param {Function} next - The next middleware function
 * @author: @moncadaluisd
 */
const deleteCurriculum = async (req, res, next) => {
  try {
    const { id } = req.params;
    const curriculum = await deleteCurriculumService(id);
    const fullPath = path.join(process.cwd(), curriculum.path);
    await fs.unlink(fullPath);
    handleApi(res, curriculum, 200, 'Curriculum deleted successfully');
  } catch (error) {
    handleApiError(res, error.stack, 500, error.message);
  }
};

/**
 * Get a review from a resume
 * @param {Object} req - The request object
 * @param {Object} res - The response object
 * @param {Function} next - The next middleware function
 * @author: @moncadaluisd
 */
const getReviewFromResume = async (req, res, next) => {
  try {
    const { id } = req.params;
    const review = await getReviewFromResumeService(id);
    handleApi(res, review);
  } catch (error) {
    handleApiError(res, error.stack, 500, error.message);
  }
};

/**
 * Show a curriculum pdf from path
 * @param {Object} req - The request object
 * @param {Object} res - The response object
 * @param {Function} next - The next middleware function
 * @author: @moncadaluisd
 */
const showCurriculumPdfFromPath = async (req, res, next) => {
  try {
    const { id } = req.params;
    const curriculum = await getCurriculumService(id);
    const pdf = await showCurriculumPdfFromPathService(curriculum.path);
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'inline; filename="curriculum.pdf"');
    res.send(pdf);
  } catch (error) {
    handleApiError(res, error.stack, 500, error.message);
  }
};

/**
 * Generate a review from a resume
 * @param {Object} req - The request object
 * @param {Object} res - The response object
 * @param {Function} next - The next middleware function
 * @author: @moncadaluisd
 */
const generateCurriculumReview = async (req, res, next) => {
  try {
    const { id } = req.params;
    const review = await generateCurriculumReviewService(id);
    handleApi(res, review, 200, 'Curriculum review generated successfully');
  } catch (error) {
    handleApiError(res, error.stack, 500, error.message);
  }
};
export {
  createCurriculum,
  getAllCurriculum,
  deleteCurriculum,
  getCurriculum,
  getReviewFromResume,
  showCurriculumPdfFromPath,
  generateCurriculumReview,
};
