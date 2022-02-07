import { AppError } from '../../Utils/AppError.js';

const restricTo = (...roles) => {
  return (req, res, next) => {
    // * check if the user has correct role to perform operation
    if (!roles.includes(req.session.user.role)) {
      return next(
        new AppError(
          'Permission denied! Role not assigned for current operation',
          403
        )
      );
    }
    next();
  };
};

export { restricTo };
