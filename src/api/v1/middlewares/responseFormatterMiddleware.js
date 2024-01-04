// responseFormatterMiddleware.js
const responseFormatterMiddleware = (req, res, next) => {
    res.apiSuccess = (data) => {
      res.status(200).json({
        status: true,
        content: {
          ...data,
        },
      });
    };
  
    res.apiCreated = (data) => {
      res.status(201).json({
        status: true,
        content: {
          ...data,
        },
      });
    };
  
    res.apiError = (error, status = 500) => {
      res.status(status).json({
        status: false,
        content: {
          error: error,
        },
      });
    };
  
    next();
  };
  
export default responseFormatterMiddleware;
  