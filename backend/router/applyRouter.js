import { Router } from 'express';
import {
  createApply,
  getAllApplies,
  getApply,
  deleteApply,
  updateApply,
  createApplyManual,
} from '../controllers/appliesController.js';
import {
  createApplyManualValidator,
  createApplyValidator,
  updateApplyValidator,
} from '../middleware/validators/appliesValidator.js';

const applyRouter = Router();

applyRouter.get('/', getAllApplies);

applyRouter.post('/', createApplyValidator, createApply);

applyRouter.post('/manual', createApplyManualValidator, createApplyManual);
applyRouter.get('/:id', getApply);

applyRouter.put('/:id', updateApplyValidator, updateApply);

applyRouter.delete('/:id', deleteApply);

export default applyRouter;
