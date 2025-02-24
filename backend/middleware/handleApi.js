/**
 * Handle API success
 * @param {Object} res - The response object
 * @param {Object} data - The data to send
 * @param {number} status - The status code
 * @param {string} message - The message
 */
export const handleApi = (res, data, status = 200, message = 'Success') => {
  res.status(status).json({
    data: data,
    message: message,
    status: status,
  });
};

/**
 * Handle API error
 * @param {Object} res - The response object
 * @param {Object} error - The error object
 * @param {number} status - The status code
 * @param {string} message - The message
 */
export const handleApiError = (
  res,
  error,
  status = 500,
  message = 'Internal Server Error',
) => {
  res.status(status).json({
    error: error, // TODO: validation when is production
    message: message,
    status: status,
  });
};
