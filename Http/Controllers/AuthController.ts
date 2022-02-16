// * Packages
import express from 'express';

// * Error Handlers
import { catchAsync } from '../../Utils/CatchAsync';

// * DDD
import UserService from '../../Application/UserService';
import AuthService from '../../Application/AuthService';

// * Define a common response for all request methods
const response = (
  req: express.Request,
  res: express.Response,
  statusCode: number,
  status: string,
  message: string,
  item: any
) => {
  return res.status(statusCode).json({
    status: status,
    message: message,
    results: item.length,
    session: req.session,
    data: {
      items: item,
    },
  });
};

class AuthController {
  signUp = catchAsync(
    async (
      req: express.Request,
      res: express.Response,
      next: express.NextFunction
    ) => {
      const user = await UserService.createUser(req);

      response(req, res, 201, 'Created', 'Success', user);
    }
  );

  logIn = catchAsync(
    async (
      req: express.Request,
      res: express.Response,
      next: express.NextFunction
    ) => {
      const user = await AuthService.logIn(req, next);
      response(req, res, 200, 'Ok', 'Success', user);
    }
  );
}

export default new AuthController();
