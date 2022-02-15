// * packages
import express from 'express';

// * Error Handlers
import { catchAsync } from '../../Utils/CatchAsync';

// * DDD
import ItemService from '../../Application/ItemService';

// * Define a common response for all request methods
const response = (
  req: express.Request,
  res: express.Response,
  statusCode: number,
  status: string,
  message: string,
  item: any
) => {
  console.log(item.length);
  return res.status(statusCode).json({
    status: status,
    message: message,
    results: item.length,
    data: {
      items: item,
    },
  });
};

class ItemController {
  // * CRUD Operations
  createItem = catchAsync(
    async (
      req: express.Request,
      res: express.Response,
      next: express.NextFunction
    ) => {
      // * Utilize Service
      const item = await ItemService.createItem(req);

      // * Send Response
      response(req, res, 201, 'Created', 'Success', item);
    }
  );

  readItem = catchAsync(
    async (
      req: express.Request,
      res: express.Response,
      next: express.NextFunction
    ) => {
      // * Utilize Service
      const item = await ItemService.readItem(req, next);

      // * Send Response
      response(req, res, 200, 'Ok', 'Success', item);
    }
  );

  updateItem = catchAsync(
    async (
      req: express.Request,
      res: express.Response,
      next: express.NextFunction
    ) => {
      // * Utilize Service
      const item = await ItemService.updateItem(req, next);

      // * Send Response
      response(req, res, 200, 'Ok', 'Success', item);
    }
  );

  deleteItem = catchAsync(
    async (
      req: express.Request,
      res: express.Response,
      next: express.NextFunction
    ) => {
      // * Utilize Service
      const item = await ItemService.deleteItem(req, next);

      // * Send Response
      response(req, res, 204, 'No Content', 'Success', item);
    }
  );

  readAllItem = catchAsync(
    async (
      req: express.Request,
      res: express.Response,
      next: express.NextFunction
    ) => {
      // * Utilize Service
      const item = await ItemService.readAllItem(req);

      // * Send Response
      response(req, res, 200, 'Ok', 'Success', item);
    }
  );
}

export default new ItemController();
