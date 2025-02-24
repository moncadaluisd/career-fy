import { body } from 'express-validator';

export const createCurriculumValidator = [
  body('name').notEmpty().withMessage('Name is required'),
];
