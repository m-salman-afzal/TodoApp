// * Packages
import express from 'express';
import { v1 as uuidv1 } from 'uuid';

// * Error Handlers
import { AppError } from '../../Utils/AppError';
import { catchAsync } from '../../Utils/CatchAsync';

// * Utils
import { Pagination } from '../../Utils/Pagination';

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
      userAPI.setPasswordConfirm(req.body.passwordConfirm);

      // * Utilize Repository
      const newUser = await UserRepository.createUser(userAPI);

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
      userAPI.setUserId(req.params.id);

      // * Utilize Repository
      const user = await UserRepository.readUser(userAPI.userId);

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

      // * Utilize Repository
      const isUpdated = await UserRepository.updateUser(
        userAPI,
        userAPI.userId
      );

      // * If no item found with id
      if (isUpdated[0] === 0)
        return next(
          new AppError(
            `User with id: ${req.params.id} cannot be found. Check Id again in URL`,
            404
          )
        );

      const user = await UserRepository.readUser(userAPI.userId);
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

      // * Utilize Repository
      const user = await UserRepository.deleteUser(userAPI.userId);

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

      // * Utilize Repository
      const allUsers = await UserRepository.readAllUser();

      const userDB = allUsers.map((el) => {
        return UserEntity.fromDB(el);
      });

      response(req, res, 200, 'Ok', 'Success', userDB);
    }
  );
}

export default new UserController();
