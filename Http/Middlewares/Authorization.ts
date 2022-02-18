// * Packages
import express from 'express';

// * Error Handlers
import * as AppError from '../../Utils/BaseError';

class Authorization {
  restricTo = (...roles: string[]) => {
    return (
      req: express.Request,
      res: express.Response,
      next: express.NextFunction
    ) => {
      // * check if the user has correct role to perform operation
      if (!roles.includes(req.body.user.role))
        throw new AppError.Forbidden(
          'Permission denied! Role not assigned for current operation'
        );

      next();
    };
  };
}

export default new Authorization();
