// * Packages
import express from 'express';
import jwt from 'jsonwebtoken';
import { promisify } from 'util';

// * Error Handlers
import { catchAsync } from '../../Utils/CatchAsync';
import * as AppError from '../../Utils/BaseError';

// * Others
import { User } from '../../App/Infrastructure/Models/Associations';
import { config } from './../../config';
import { Identifier } from 'sequelize/dist';

class Authentication {
  protect = catchAsync(
    async (
      req: express.Request,
      res: express.Response,
      next: express.NextFunction
    ) => {
      let token: any;
      // * check if we get the session cookie which is still valid
      if (
        req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')
      ) {
        token = req.headers.authorization.split(' ')[1];
      }

      if (!token) {
        throw new AppError.Unauthorized(
          'User is not Logged In! Kindly Login Again'
        );
      }
      // TODO ask the following promise
      // let decodedVal;
      // const tokenVerify = new Promise((resolve, reject) => {
      //   jwt.verify(token, config.JWT_SECRET, (err, decoded) => {
      //     resolve(decoded);
      //     reject(err);
      //   });
      // }).then((value) => {
      //   decodedVal = value;
      //   console.log('🥶🥶🥶', value);
      //   console.log('👿👿👿', decodedVal);
      // });

      // // tokenVerify.then((value) => {
      // //   decodedVal = value;
      // //   console.log('🥶🥶🥶', value);
      // //   console.log('👿👿👿', decodedVal);
      // // });
      // console.log('😶‍🌫️😶‍🌫️😶‍🌫️', tokenVerify);
      // const tokenVerify: any = jwt.verify(token, config.JWT_SECRET);
      // console.log('🥶🥶🥶', tokenVerify.userId);
      let userId;
      jwt.verify(token, config.JWT_SECRET, (err, decoded) => {
        userId = decoded.userId;
      });

      // * check if the user still exists in our database
      const currentUser = await User.findByPk(userId);

      if (!currentUser)
        throw new AppError.Unauthorized(
          'User with current session does not exist anymore! Kindly login again.'
        );
      req.body.user = currentUser;

      next();
    }
  );
}

export default new Authentication();
