import { Router } from 'express';
import {
  createCurriculum,
  deleteCurriculum,
  getAllCurriculum,
  getCurriculum,
  getReviewFromResume,
  showCurriculumPdfFromPath,
} from '../controllers/curriculumController.js';
import { createCurriculumValidator } from '../middleware/validators/curriculumValidator.js';
import { uploadPdf } from '../middleware/handleMulter.js';

const curriculumRouter = Router();

curriculumRouter.get('/', getAllCurriculum);

curriculumRouter.post(
  '/',
  uploadPdf.single('file'),
  createCurriculumValidator,
  createCurriculum,
);
curriculumRouter.get('/:id', getCurriculum);
curriculumRouter.delete('/:id', deleteCurriculum);
curriculumRouter.get('/:id/review', getReviewFromResume);
curriculumRouter.get('/:id/pdf', showCurriculumPdfFromPath);
export default curriculumRouter;
