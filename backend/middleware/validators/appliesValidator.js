import { body } from 'express-validator';

export const createApplyValidator = [
  body('url')
    .notEmpty()
    .withMessage('URL is required')
    .isURL()
    .withMessage('Invalid URL format')
];


export const updateApplyValidator = [
  body('status')
    .notEmpty()
    .withMessage('Status is required'),
  body('id')
    .notEmpty()
    .withMessage('ID is required')
    .isMongoId()
    .withMessage('Invalid ID format'),
];
