import multer from 'multer';
import { generateNameFile } from '../utils/namingFile.js';

/**
 * Storage for multer
 * @returns {multer.StorageEngine}
 */
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, generateNameFile(file));
  },
});

/**
 * File filter for multer
 * @param {Object} req - The request object
 * @param {Object} file - The file object
 * @param {Function} cb - The callback function
 */
const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'application/pdf') {
    cb(null, true);
  } else {
    cb(new Error('Solo se permiten archivos PDF'), false);
  }
};

/**
 * Upload PDF
 * @returns {multer}
 */
const uploadPdf = multer({
  storage,
  limits: { fileSize: 15 * 1024 * 1024 }, // Máximo 5MB
  fileFilter,
});

export { uploadPdf };
