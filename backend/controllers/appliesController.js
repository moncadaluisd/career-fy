import { validationResult } from 'express-validator';
import { handleApi, handleApiError } from '../middleware/handleApi.js';
import {
  ApplyCreateService,
  deleteApplyService,
  getAllAppliesService,
  getApplyService,
  updateApplyService,
} from '../services/applyService.js';

/**
 * Create a new apply
 * @param {Object} req - The request object
 * @param {Object} res - The response object
 * @param {Function} next - The next function
 */
const createApply = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const error = errors.array();
      return handleApiError(res, error, 422, 'Validation error');
    }

    const { url } = req.body;

    const json = await ApplyCreateService(url);

    return handleApi(res, json, 200, 'Apply created successfully');
  } catch (error) {
    next(error);
  }
};

/**
 * Get all applies
 * @param {Object} req - The request object
 * @param {Object} res - The response object
 * @param {Function} next - The next function
 */
const getAllApplies = async (req, res, next) => {
  try {
    const json = await getAllAppliesService();
    return handleApi(res, json, 200, 'Applies fetched successfully');
  } catch (error) {
    next(error);
  }
};

/**
 * Get a apply
 * @param {Object} req - The request object
 * @param {Object} res - The response object
 * @param {Function} next - The next function
 */
const getApply = async (req, res, next) => {
  try {
    const json = await getApplyService(req.params.id);
    return handleApi(res, json, 200, 'Apply fetched successfully');
  } catch (error) {
    next(error);
  }
};

/**
 * Delete a apply
 * @param {Object} req - The request object
 * @param {Object} res - The response object
 * @param {Function} next - The next function
 */
const deleteApply = async (req, res, next) => {
  try {
    await deleteApplyService(req.params.id);
    return handleApi(res, null, 200, 'Apply deleted successfully');
  } catch (error) {
    next(error);
  }
};

/**
 * Update a apply
 * @param {Object} req - The request object
 * @param {Object} res - The response object
 * @param {Function} next - The next function
 */
const updateApply = async (req, res, next) => {
  try {
    const json = await updateApplyService(req.params.id, req.body);
    return handleApi(res, json, 200, 'Apply updated successfully');
  } catch (error) {
    next(error);
  }
};

export { createApply, getAllApplies, getApply, deleteApply, updateApply };
