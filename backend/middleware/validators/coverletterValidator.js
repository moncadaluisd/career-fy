import { body } from 'express-validator';

export const createCoverletterValidator = [
  body('applyId').isString().notEmpty(),
  body('curriculumId').isString().notEmpty(),
];
