import { analyzingHtml } from '../assistants/analyzingHtml.js';
import { APPLY_STATUS } from '../config/constants.js';
import Apply from '../models/applies.js';
import { parseToJson } from '../utils/parseToJson.js';
import { openaiService } from './openaiService.js';
import { scrappingService } from './scrappingService.js';

/**
 * Create a new apply
 * @param {string} url - The url of the job offer
 * @returns {Promise<Apply>} The created apply
 */
const ApplyCreateService = async (url) => {
  const html = await scrappingService(url);
  const text = await openaiService(analyzingHtml(html));
  const json = parseToJson(text);

  if (!json) {
    throw new Error('Error parsing to json');
  }

  if (
    !json.name ||
    !json.description
  ) {
    throw new Error('Error parsing to json');
  }

  const apply = await Apply.create({
    url,
    name: json.name,
    description: json.description,
    tags: json.tags,
    location: json.location,
    typeWork: json.typeWork,
    salary: json.salary,
    company: json.company,
    status: APPLY_STATUS.PENDING,
  });

  return apply;
};

/**
 * Get all applies
 * @returns {Promise<Apply[]>} The list of applies
 */
const getAllAppliesService = async () => {
  const applies = await Apply.find();
  return applies;
};

/**
 * Get a apply
 * @param {string} id - The id of the apply
 * @returns {Promise<Apply>} The apply
 */
const getApplyService = async (id) => {
  const apply = await Apply.findById(id);
  if (!apply) {
    throw new Error('Apply not found');
  }
  return apply;
};

/**
 * Delete a apply
 * @param {string} id - The id of the apply
 * @returns {Promise<Apply>} The deleted apply
 */
const deleteApplyService = async (id) => {
  const apply = await getApplyService(id);
  if (!apply) {
    throw new Error('Apply not found');
  }

  await Apply.findByIdAndDelete(id);

  return apply;
};

/**
 * Update a apply
 * @param {string} id - The id of the apply
 * @param {Object} body - The body of the apply
 * @returns {Promise<Apply>} The updated apply
 */
const updateApplyService = async (id, body) => {
  const apply = await getApplyService(id);
  if (!apply) {
    throw new Error('Apply not found');
  }

  apply.status = body.status;
  await apply.save();

  return apply;
};

export {
  ApplyCreateService,
  getAllAppliesService,
  getApplyService,
  deleteApplyService,
  updateApplyService,
};
