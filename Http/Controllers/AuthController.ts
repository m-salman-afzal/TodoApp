// * Packages
import express from 'express';

// * Error Handlers
import { catchAsync } from '../../Utils/CatchAsync';

// * DDD
import AuthService from '../../App/Application/AuthService';

// * Others
import { config } from '../../config';

// * Define a common response for all request methods
const response = (
  req: express.Request,
  res: express.Response,
  statusCode: number,
  status: string,
  message: string,
  item
) => {
  return res.status(statusCode).json({
    status: status,
    message: message,
    results: item.length,
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
      const user = await AuthService.signUp(req);
      res.cookie('jwt', user.token, {
        expires: new Date(
          Date.now() + config.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
        ),
        // secure: true,
        httpOnly: true,
      });

      response(req, res, 201, 'Created', 'Success', user);
    }
  );

  logIn = catchAsync(
    async (
      req: express.Request,
      res: express.Response,
      next: express.NextFunction
    ) => {
      const user: any = await AuthService.logIn(req);

      res.cookie('jwt', user.token, {
        expires: new Date(
          Date.now() + config.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
        ),
        // secure: true,
        httpOnly: true,
      });

      response(req, res, 200, 'Ok', 'Success', user.userDB);
    }
  );
}

export default new AuthController();
