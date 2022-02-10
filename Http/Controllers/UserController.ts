import { User } from '../../Models/Associations';
import { AppError } from '../../Utils/AppError';
import { catchAsync } from '../../Utils/CatchAsync';
import { Pagination } from '../../Utils/Pagination';
import { UserEntity } from '../../Domain/UserEntity';
import express from 'express';

import { v1 as uuidv1 } from 'uuid';

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
    data: {
      items: item,
    },
  });
};

class UserController {
  createUser = catchAsync(
    async (
      req: express.Request,
      res: express.Response,
      next: express.NextFunction
    ) => {
      // * Utilize Entity
      const userAPI = UserEntity.fromAPI(req);
      userAPI.setUserId(uuidv1());
      userAPI.setPassword(req.body.password);
      userAPI.setPassword(req.body.passwordConfirm);

      const newUser = await User.create(userAPI);

      const userDB = UserEntity.fromDB(newUser);

      response(req, res, 201, 'Created', 'Success', userDB);
    }
  );

  readUser = catchAsync(
    async (
      req: express.Request,
      res: express.Response,
      next: express.NextFunction
    ) => {
      // * Utilize Entity
      const userAPI = UserEntity.fromAPI(req);
      userAPI.setUserId(req.session.user.userId);

      const user = await User.findOne({
        where: { userId: userAPI.userId },
      });

      // * If no item found with id
      if (!user)
        return next(
          new AppError(
            `User with id: ${req.params.id} cannot be found. Check Id again in URL`,
            404
          )
        );

      const userDB = UserEntity.fromDB(user);

      response(req, res, 200, 'Ok', 'Success', userDB);
    }
  );

  updateUser = catchAsync(
    async (
      req: express.Request,
      res: express.Response,
      next: express.NextFunction
    ) => {
      // * Utilize Entity
      const userAPI = UserEntity.fromAPI(req);
      userAPI.setUserId(req.params.id);

      const isUpdated = await User.update(userAPI, {
        where: { userId: userAPI.userId },
      });

      // * If no item found with id
      if (isUpdated[0] === 0)
        return next(
          new AppError(
            `User with id: ${req.params.id} cannot be found. Check Id again in URL`,
            404
          )
        );

      const user = await User.findByPk(userAPI.userId);
      const userDB = UserEntity.fromDB(user);

      response(req, res, 200, 'Ok', 'Success', userDB);
    }
  );

  deleteUser = catchAsync(
    async (
      req: express.Request,
      res: express.Response,
      next: express.NextFunction
    ) => {
      // * Utilize Entity
      const userAPI = UserEntity.fromAPI(req);
      userAPI.setUserId(req.params.id);

      const user = await User.destroy({
        where: { userId: userAPI.userId },
      });

      // * If no item found with id
      if (!user)
        return next(
          new AppError(
            `Item with id: ${req.params.id} cannot be found. Check Id again in URL`,
            404
          )
        );

      response(req, res, 204, 'No Content', 'Success', user);
    }
  );

  readAllUser = catchAsync(
    async (
      req: express.Request,
      res: express.Response,
      next: express.NextFunction
    ) => {
      // * Utilize Entity
      const userAPI = UserEntity.fromAPI(req);
      userAPI.setUserId(req.params.id);

      const allUsers = await User.findAll();

      const userDB = allUsers.map((el) => {
        return UserEntity.fromDB(el);
      });

      response(req, res, 200, 'Ok', 'Success', userDB);
    }
  );
}

export default new UserController();
