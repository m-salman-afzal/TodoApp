// * Packages
import express from 'express';

// * Error Handlers
import { AppError } from '../../Utils/AppError';

class Authorization {
  restricTo = (...roles: string[]) => {
    return (
      req: express.Request,
      res: express.Response,
      next: express.NextFunction
    ) => {
      // * check if the user has correct role to perform operation
      if (!roles.includes(req.session.user.role))
        throw new AppError(
          'Permission denied! Role not assigned for current operation',
          403
        );

      next();
    };
  };
}

export default new Authorization();
