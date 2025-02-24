// openai service

import openai from '../config/openAi.js';

/**
 * Openai service
 * @param {Object} assistant
 * @returns {Object}
 */
export const openaiService = async (assistant) => {
  const response = await openai.chat.completions.create(assistant);
  return response.choices[0].message.content;
};

export const openAiServiceUploadPdfFile = async (path) => {
  const response = await openai.files.create({
    purpose: 'assistants',
    file: fs.createReadStream(path),
  });
  return response;
};
