const sendErrorDev = (err, res) => {
  console.error('ErrorDev 😨😨');
  res.status(err.httpCode).json({
    message: err.message,
    error: err,
    stack: err.stack,
  });
};

const routeError = (err, req, res, next) => {
  err.httpCode = err.httpCode || 500;
  err.name = err.name || 'error';
  if (process.env.NODE_ENV === 'development') {
    sendErrorDev(err, res);
  }
};

export { routeError };
