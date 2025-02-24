import fs from 'fs';
import parser from 'pdf-parse';
/**
 * Transform a PDF file to text
 * @param {string} path - The path to the PDF file
 * @returns {string} The text of the PDF file
 * @throws {Error} If the file doesn't exist or cannot be processed
 */
const transformPdfToText = async (path) => {
  try {
    const dataBuffer = fs.readFileSync(path);
    const pdf = await parser(dataBuffer);
    return pdf.text;
  } catch (error) {
    if (error.code === 'ENOENT') {
      throw new Error(`PDF file not found at path: ${path}`);
    }
    throw new Error(`Error processing PDF: ${error.message}`);
  }
};

export default transformPdfToText;
