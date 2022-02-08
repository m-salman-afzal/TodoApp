import { itemSchema } from '../../Models/ItemModels';
import { AppError } from '../../Utils/AppError';
import { catchAsync } from '../../Utils/CatchAsync';
import { Pagination } from '../../Utils/Pagination';

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
    data: {
      items: item,
    },
  });
};

class ItemController {
  createItem = catchAsync(
    async (
      req: express.Request,
      res: express.Response,
      next: express.NextFunction
    ) => {
      req.body.itemId = uuidv1();
      req.body.userId = req.session.user.userId;
      const newItem = await itemSchema.create(req.body);
      response(req, res, 201, 'Created', 'Success', newItem);
    }
  );

  readItem = catchAsync(
    async (
      req: express.Request,
      res: express.Response,
      next: express.NextFunction
    ) => {
      const item = await itemSchema.findOne({
        where: { itemId: req.params.id, userId: req.session.user.userId },
      });

      // * If no item found with id
      if (!item)
        return next(
          new AppError(
            `Item with id: ${req.params.id} cannot be found. Check Id again in URL`,
            404
          )
        );

      response(req, res, 200, 'Ok', 'Success', item);
    }
  );

  updateItem = catchAsync(
    async (
      req: express.Request,
      res: express.Response,
      next: express.NextFunction
    ) => {
      const isUpdated = await itemSchema.update(req.body, {
        where: { itemId: req.params.id, userId: req.session.user.userId },
      });

      // * If no item found with id
      if (isUpdated[0] === 0)
        return next(
          new AppError(
            `Item with id: ${req.params.id} cannot be found. Check Id again in URL`,
            404
          )
        );

      const item = await itemSchema.findByPk(req.params.id);

      response(req, res, 200, 'Ok', 'Success', item);
    }
  );

  deleteItem = catchAsync(
    async (
      req: express.Request,
      res: express.Response,
      next: express.NextFunction
    ) => {
      const item = await itemSchema.destroy({
        where: { itemId: req.params.id, userId: req.session.user.userId },
      });

      // * If no item found with id
      if (!item)
        return next(
          new AppError(
            `Item with id: ${req.params.id} cannot be found. Check Id again in URL`,
            404
          )
        );

      response(req, res, 204, 'No Content', 'Success', item);
    }
  );

  readAllItem = catchAsync(
    async (
      req: express.Request,
      res: express.Response,
      next: express.NextFunction
    ) => {
      // const features = new M_ApiFeatures(itemSchema, req).sort().paginate();
      // .filter();

      // const item = await features.query;
      // console.log(item);
      let fields = [];
      // const page = req.query.page * 1 || 1;
      // const limit = req.query.limit * 1 || 1;
      // const skip = (page - 1) * limit;
      if (req.query.fields) {
        fields = (req.query.fields as string).split(',');
      } else {
        fields = ['title', 'priority', 'description', 'dueDate'];
      }
      const offset = new Pagination(+req.query.limit, +req.query.page).skip();
      const allItems = await itemSchema.findAll({
        where: {
          userId: req.session.user.userId,
        },
        order: [['itemId', 'ASC']],
        offset: offset,
        limit: +req.query.limit,
        attributes: fields,
      });

      response(req, res, 200, 'Ok', 'Success', allItems);
    }
  );
}

export default new ItemController();
