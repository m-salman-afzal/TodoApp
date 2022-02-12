// * Packages
import { v1 as uuidv1 } from 'uuid';
import express from 'express';

// * Error Handlers
import { AppError } from '../../Utils/AppError';
import { catchAsync } from '../../Utils/CatchAsync';

// * DDD
import { UserEntity } from '../../Domain/UserEntity';
import UserRepository from '../../Infrastructure/Repositories/UserRepository';

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
      // * Utilize Entity
      const userAPI = UserEntity.fromAPI(req);
      userAPI.setUserId(uuidv1());
      userAPI.setPassword(req.body.password);
      userAPI.setPasswordConfirm(req.body.passwordConfirm);

      const newUser = await UserRepository.createUser(userAPI);

      const userDB = UserEntity.fromDB(newUser);

      response(req, res, 201, 'Created', 'Success', userDB);
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
      // * Utilize Entity
      const userAPI = UserEntity.fromAPI(req);

      // * check if the user has entered correct email and password
      const user = await UserRepository.readUser(undefined, userAPI.email);

      // if (!user || !(await user.correctPassword(password, user.password))) {
      //   return next(
      //     new AppError('Email or Password is Wrong! Try Again.', 404)
      //   );
      // }

      // * Set the session-cookie
      req.session.isAuth = true;
      req.session.user = user;

      const userDB = UserEntity.fromDB(user);

      response(req, res, 200, 'Ok', 'Success', userDB);
    }
  );
}

export default new AuthController();
