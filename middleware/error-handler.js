import { CustomAPIError } from '../errors/custom-error';

const errorHandler = (err, req, res, next) => {
    if (err instanceof CustomAPIError) {
      return res
        .status(err.statusCode)
        .json({
          result: 'error',
          msg: err.message
        })
    }

    return res.status(500).json({
      result: 'error',
      msg: 'Something went wrong, please try again'
    })
};

export default errorHandler;