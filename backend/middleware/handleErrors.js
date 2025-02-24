
/**
 * Middleware to handle errors
 * @param {*} err
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
export const handleErrors = (err, req, res, next) => {
    console.log(err.stack);
    res.status(500).json({
      message: 'Internal Server Error',
      error: err.message,
      stack: err.stack
    });
}
