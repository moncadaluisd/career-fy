import { Router } from 'express';
import {
  createCoverletter,
  createCoverletterMessage,
  deleteCoverletter,
  getAllCoverletters,
  getCoverletter,
  updateCoverletter,
} from '../controllers/coverletterController.js';
import {
  createCoverletterMessageValidator,
  createCoverletterValidator,
} from '../middleware/validators/coverletterValidator.js';

const coverletterRouter = Router();

coverletterRouter.get('/', getAllCoverletters);
coverletterRouter.post('/', createCoverletterValidator, createCoverletter);
coverletterRouter.get('/:id', getCoverletter);
coverletterRouter.put('/:id', updateCoverletter);
coverletterRouter.post(
  '/:id/message',
  createCoverletterMessageValidator,
  createCoverletterMessage,
);
coverletterRouter.delete('/:id', deleteCoverletter);

export default coverletterRouter;
