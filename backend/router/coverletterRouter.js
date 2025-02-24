import { Router } from 'express';
import {
  createCoverletter,
  deleteCoverletter,
  getAllCoverletters,
  getCoverletter,
  updateCoverletter,
} from '../controllers/coverletterController.js';
import { createCoverletterValidator } from '../middleware/validators/coverletterValidator.js';

const coverletterRouter = Router();

coverletterRouter.get('/', getAllCoverletters);
coverletterRouter.post('/', createCoverletterValidator, createCoverletter);
coverletterRouter.get('/:id', getCoverletter);
coverletterRouter.put('/:id', updateCoverletter);
coverletterRouter.delete('/:id', deleteCoverletter);

export default coverletterRouter;
