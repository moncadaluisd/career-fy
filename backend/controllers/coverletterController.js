import { validationResult } from 'express-validator';
import { handleApi, handleApiError } from '../middleware/handleApi.js';
import {
  createCoverletterService,
  deleteCoverletterService,
  getAllCoverlettersService,
  getCoverletterService,
  updateCoverletterService,
} from '../services/coverletterService.js';

/**
 * Create a new coverletter
 * @param {Object} req - The request object
 * @param {Object} res - The response object
 * @param {Function} next - The next function
 */
const createCoverletter = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const error = errors.array();
      return handleApiError(res, error, 422, 'Validation error');
    }

    const { applyId, curriculumId, isShort = false } = req.body;

    const json = await createCoverletterService(applyId, curriculumId, isShort);

    return handleApi(res, json, 201, 'Coverletter created successfully');
  } catch (error) {
    next(error);
  }
};

/**
 * Get all coverletters
 * @param {Object} req - The request object
 * @param {Object} res - The response object
 * @param {Function} next - The next function
 */
const getAllCoverletters = async (req, res, next) => {
  try {
    const json = await getAllCoverlettersService();
    return handleApi(res, json, 200, 'Coverletters fetched successfully');
  } catch (error) {
    next(error);
  }
};

/**
 * Get a coverletter
 * @param {Object} req - The request object
 * @param {Object} res - The response object
 * @param {Function} next - The next function
 */
const getCoverletter = async (req, res, next) => {
  try {
    const json = await getCoverletterService(req.params.id);
    return handleApi(res, json, 200, 'Coverletter fetched successfully');
  } catch (error) {
    next(error);
  }
};

/**
 * Delete a coverletter
 * @param {Object} req - The request object
 * @param {Object} res - The response object
 * @param {Function} next - The next function
 */
const deleteCoverletter = async (req, res, next) => {
  try {
    await deleteCoverletterService(req.params.id);
    return handleApi(res, null, 200, 'Coverletter deleted successfully');
  } catch (error) {
    next(error);
  }
};

/**
 * Update a coverletter
 * @param {Object} req - The request object
 * @param {Object} res - The response object
 * @param {Function} next - The next function
 */
const updateCoverletter = async (req, res, next) => {
  try {
    const { text } = req.body;
    const json = await updateCoverletterService(req.params.id, text);
    return handleApi(res, json, 200, 'Coverletter updated successfully');
  } catch (error) {
    next(error);
  }
};

export {
  createCoverletter,
  getAllCoverletters,
  getCoverletter,
  deleteCoverletter,
  updateCoverletter,
};
