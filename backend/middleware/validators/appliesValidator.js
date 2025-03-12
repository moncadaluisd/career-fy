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

export const createApplyManualValidator = [
  body('url')
    .notEmpty()
    .withMessage('URL is required')
    .isURL()
    .withMessage('Invalid URL format'),
  body('name')
    .notEmpty()
    .withMessage('Name is required'),
  body('description')
    .notEmpty()
    .withMessage('Description is required'),
  body('status')
    .notEmpty()
    .withMessage('Status is required'),
  body('tags')
    .optional()
    .isArray()
    .withMessage('Tags must be an array'),
  body('location')
    .optional(),
  body('typeWork')
    .optional(),
  body('salary')
    .optional(),
  body('company')
    .optional(),
  body('createdAt')
    .optional(),
  body('updatedAt')
    .optional(),
];


export const updateApplyManualValidator = [
  body('id')
    .notEmpty()
    .withMessage('ID is required')
    .isMongoId()
    .withMessage('Invalid ID format'),
  body('name')
    .optional(),
  body('description')
    .optional(),
  body('status')
    .optional(),
  body('tags')
    .optional()
    .isArray()
    .withMessage('Tags must be an array'),
  body('location')
    .optional(),
  body('typeWork')
    .optional(),
  body('salary')
    .optional(),
  body('company')
    .optional(),

];
