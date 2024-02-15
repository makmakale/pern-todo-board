import ApiError from '../utils/ResponseHandler.js';

const errorHandler = (err, req, res) => {
  console.log('errorHandler');
  if (err instanceof ApiError) {
    return res.status(err.status).json({ message: err.message });
  }
  return res.status(500).json({ message: 'Internal Server Error' });
};

export default errorHandler;
