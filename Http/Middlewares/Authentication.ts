// * Packages
import express from 'express';
import jwt from 'jsonwebtoken';
import { promisify } from 'util';

// * Error Handlers
import { catchAsync } from '../../Utils/CatchAsync';
import { AppError } from '../../Utils/AppError';

// * Others
import { User } from '../../Infrastructure/Models/Associations';
import { config } from './../../config';

class Authentication {
  protect = catchAsync(
    async (
      req: express.Request,
      res: express.Response,
      next: express.NextFunction
    ) => {
      let token;
      // * check if we get the session cookie which is still valid
      if (
        req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')
      ) {
        token = req.headers.authorization.split(' ')[1];
      }

      if (!token) {
        throw new AppError('User is not Logged In! Kindly Login Again', 401);
      }

      // const tokenVerify = new Promise((resolve, reject) => {
      //   jwt.verify(token, config.JWT_SECRET, (err, decoded) => {
      //     resolve(decoded);
      //     reject(err);
      //   });
      // });
      // let decodedVal;
      // tokenVerify.then((value) => {
      //   decodedVal = value;
      // });
      let userId;
      jwt.verify(token, config.JWT_SECRET, (err, decoded) => {
        console.log(decoded.userId);
        userId = decoded.userId;
      });

      // * check if the user still exists in our database
      const currentUser = await User.findByPk(userId);

      if (!currentUser)
        throw new AppError(
          'User with current session does not exist anymore! Kindly login again.',
          401
        );
      res.locals.user = currentUser;

      next();
    }
  );
}

export default new Authentication();
