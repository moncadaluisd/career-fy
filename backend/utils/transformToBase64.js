import fs from 'fs/promises';

/**
 * Transform to base64 a pdf file
 * @param {string} path - The path of the pdf file
 * @returns {string} - The base64 of the pdf file
 */
const transformToBase64 = async (path) => {
  const pdf = await fs.readFile(path);
  return pdf.toString('base64');
};

export default transformToBase64;
