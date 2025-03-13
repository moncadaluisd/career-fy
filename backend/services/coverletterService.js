import { coverLertterWriting } from '../assistants/coverLertterWriting.js';
import Coverletter from '../models/coverletters.js';
import { getApplyService } from './applyService.js';
import { getCurriculumService } from './curriculumService.js';
import { openaiService } from './openaiService.js';

/**
 * Create a new coverletter
 * @param {string} text - The text of the coverletter
 * @param {string} applyId - The id of the apply
 * @returns {Promise<Coverletter>} The created coverletter
 */
const createCoverletterService = async (applyId, curriculumId) => {
  const apply = await getApplyService(applyId);

  const curriculum = await getCurriculumService(curriculumId);

  const coverletters = await getCoverLetterVersionService(
    applyId,
    curriculumId,
  );

  const version = coverletters.length + 1;

  const resume = curriculum.data;

  const text = await openaiService(
    coverLertterWriting({
      name: apply.name,
      description: apply.description,
      tags: apply.tags,
      resume: resume,
    }),
  );

  const coverletter = await Coverletter.create({
    text: text,
    apply: applyId,
    curriculum: curriculumId,
    isShort: false,
    version,
  });

  return coverletter;
};

const regenerateCoverLetterService = async (coverletterId, message) => {
  const coverletter = await Coverletter.findById(coverletterId);
  if (!coverletter) {
    throw new Error('Coverletter not found');
  }

  const apply = await getApplyService(coverletter.apply);

  const curriculum = await getCurriculumService(coverletter.curriculum);

  const resume = curriculum.data;

  const messageData = `
   This is the  old coverletter:
  ${coverletter.text}

  This is the message:
  ${message}
  `;

  const text = await openaiService(
    coverLertterWriting(
      {
        name: apply.name,
        description: apply.description,
        tags: apply.tags,
        resume: resume,
      },
      messageData,
      'gpt-4o-mini',
    ),
  );

  coverletter.message.push({
    message: message,
    text: text,
  });
  await coverletter.save();

  return coverletter;
};

/**
 * Get a coverletter version
 * @param {string} applyId - The id of the apply
 * @param {string} curriculumId - The id of the curriculum
 * @returns {Promise<Coverletter[]>} The list of coverletters
 */
const getCoverLetterVersionService = async (applyId, curriculumId) => {
  const coverletter = await Coverletter.find({
    apply: applyId,
    curriculum: curriculumId,
  });
  return coverletter;
};

/**
 * Get all coverletters
 * @returns {Promise<Coverletter[]>} The list of coverletters
 */
const getAllCoverlettersService = async (
  curriculumId = null,
  applyId = null,
) => {
  const query = {};

  if (curriculumId) {
    query.curriculum = curriculumId;
  }

  if (applyId) {
    query.apply = applyId;
  }

  const coverletters = await Coverletter.find(query);
  const coverlettersWithPopulated = await Coverletter.populate(
    coverletters,
    'apply curriculum',
  );
  // order messages from the most recent to the oldest
  coverlettersWithPopulated.sort((a, b) => {
    return b.message.length - a.message.length;
  });

  return coverlettersWithPopulated;
};

/**
 * Get a coverletter
 * @param {string} id - The id of the coverletter
 * @returns {Promise<Coverletter>} The coverletter
 */
const getCoverletterService = async (id) => {
  const coverletter = await Coverletter.findById(id).populate('apply');
  if (!coverletter) {
    throw new Error('Coverletter not found');
  }
  return coverletter;
};

/**
 * Delete a coverletter
 * @param {string} id - The id of the coverletter
 */
const deleteCoverletterService = async (id) => {
  const coverletter = await getCoverletterService(id);
  if (!coverletter) {
    throw new Error('Coverletter not found');
  }

  await Coverletter.findByIdAndDelete(id);
  return coverletter;
};

/**
 * Update a coverletter
 * @param {string} id - The id of the coverletter
 * @param {string} text - The text of the coverletter
 * @returns {Promise<Coverletter>} The updated coverletter
 */
const updateCoverletterService = async (id, text) => {
  const coverletter = await Coverletter.findById(id);
  if (!coverletter) {
    throw new Error('Coverletter not found');
  }

  coverletter.text = text;
  coverletter.updatedAt = Date.now();
  await coverletter.save();

  return coverletter;
};

export {
  createCoverletterService,
  getAllCoverlettersService,
  getCoverletterService,
  deleteCoverletterService,
  updateCoverletterService,
  regenerateCoverLetterService,
};
