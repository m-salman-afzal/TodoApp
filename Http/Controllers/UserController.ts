// * Packages
import express from 'express';

// * Error Handlers
import { catchAsync } from '../../Utils/CatchAsync';

// * DDD
import UserService from '../../App/Application/UserService';

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
      // * Utilize Service
      const user = await UserService.createUser(req);

      // * Send Response
      response(req, res, 201, 'Created', 'Success', user);
    }
  );

  readUser = catchAsync(
    async (
      req: express.Request,
      res: express.Response,
      next: express.NextFunction
    ) => {
      // * Utilize Service
      const user = await UserService.readUser(req);

      // * Send Response
      response(req, res, 200, 'Ok', 'Success', user);
    }
  );

  updateUser = catchAsync(
    async (
      req: express.Request,
      res: express.Response,
      next: express.NextFunction
    ) => {
      // * Utilize Service
      const user = await UserService.updateUser(req);

      // * Send Response
      response(req, res, 200, 'Ok', 'Success', user);
    }
  );

  deleteUser = catchAsync(
    async (
      req: express.Request,
      res: express.Response,
      next: express.NextFunction
    ) => {
      // * Utilize Service
      const user = await UserService.deleteUser(req);

      // * Send Response
      response(req, res, 204, 'No Content', 'Success', user);
    }
  );

  readAllUser = catchAsync(
    async (
      req: express.Request,
      res: express.Response,
      next: express.NextFunction
    ) => {
      // * Utilize Service
      const user = await UserService.readAllUser(req);

      // * Send Response
      response(req, res, 200, 'Ok', 'Success', user);
    }
  );
}

export default new UserController();
