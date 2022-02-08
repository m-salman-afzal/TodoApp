import { userSchema } from '../../Models/UserModels';
import { AppError } from '../../Utils/AppError';
import { catchAsync } from '../../Utils/CatchAsync';

import { v1 as uuidv1 } from 'uuid';
import express from 'express';

// * Define a common response for all request methods
const response = (
  req,
  res,
  statusCode: number,
  status: string,
  message: string,
  item
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
      req.body.userId = uuidv1();
      const user = await userSchema.create(req.body);
      response(req, res, 201, 'Created', 'Success', user);
    }
  );

  logIn = catchAsync(
    async (
      req: express.Request,
      res: express.Response,
      next: express.NextFunction
    ) => {
      // * Check if the user entered the email or password or not
      const { email, password } = req.body;
      if (!email || !password) {
        return next(new AppError('Email or Password not entered!', 404));
      }

      // * check if the user has entered correct email and password
      const user: any = await userSchema.findOne({
        where: { email: email },
      });

      if (!user || !(await user.correctPassword(password, user.password))) {
        return next(
          new AppError('Email or Password is Wrong! Try Again.', 404)
        );
      }

      // * Set the session-cookie
      req.session.isAuth = true;
      req.session.user = user;

      response(req, res, 200, 'Ok', 'Success', user);
    }
  );
}

export default new AuthController();
