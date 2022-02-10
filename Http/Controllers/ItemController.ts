import { Item } from '../../Models/Associations';
import { AppError } from '../../Utils/AppError';
import { catchAsync } from '../../Utils/CatchAsync';
import { Pagination } from '../../Utils/Pagination';
import { ItemEntity } from '../../Domain/ItemEntity';

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
      // * Utilize Entity
      // TODO Quesion linked to ItemEntity.js
      // const item = ItemEntity.fromAPI(
      //   req.session.user.userId,
      //   req.body.title,
      //   req.body.priority,
      //   req.body.description,
      //   req.body.dueDate
      // );
      const itemAPI = ItemEntity.fromAPI(req);
      itemAPI.setItemId(uuidv1());
      itemAPI.setUserId(req.session.user.userId);

      const newItem = await Item.create(itemAPI);
      response(req, res, 201, 'Created', 'Success', newItem);
    }
  );

  readItem = catchAsync(
    async (
      req: express.Request,
      res: express.Response,
      next: express.NextFunction
    ) => {
      // * Utilize Entity
      const itemAPI = ItemEntity.fromAPI(req);
      itemAPI.setItemId(req.params.id);
      itemAPI.setUserId(req.session.user.userId);

      const item = await Item.findOne({
        where: { itemId: itemAPI.itemId, userId: itemAPI.userId },
      });

      // * If no item found with id
      if (!item)
        return next(
          new AppError(
            `Item with itemId: ${req.params.id} for user with userId: ${req.session.user.userId} with cannot be found. Check Id again in URL`,
            404
          )
        );

      const itemDB = ItemEntity.fromDB(item);

      response(req, res, 200, 'Ok', 'Success', itemDB);
    }
  );

  updateItem = catchAsync(
    async (
      req: express.Request,
      res: express.Response,
      next: express.NextFunction
    ) => {
      // * Utilize Entity
      const itemAPI = ItemEntity.fromAPI(req);
      itemAPI.setItemId(req.params.id);
      itemAPI.setUserId(req.session.user.userId);

      const isUpdated = await Item.update(itemAPI, {
        where: { itemId: itemAPI.itemId, userId: itemAPI.userId },
      });

      // * If no item found with id
      if (isUpdated[0] === 0)
        return next(
          new AppError(
            `Item with id: ${req.params.id} cannot be found. Check Id again in URL`,
            404
          )
        );

      const item = await Item.findByPk(req.params.id);
      const itemDB = ItemEntity.fromDB(item);

      response(req, res, 200, 'Ok', 'Success', itemDB);
    }
  );

  deleteItem = catchAsync(
    async (
      req: express.Request,
      res: express.Response,
      next: express.NextFunction
    ) => {
      // * Utilize Entity
      const itemAPI = ItemEntity.fromAPI(req);
      itemAPI.setItemId(req.params.id);
      itemAPI.setUserId(req.session.user.userId);

      const item = await Item.destroy({
        where: { itemId: itemAPI.itemId, userId: itemAPI.userId },
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
      // // const features = new M_ApiFeatures(Item, req).sort().paginate();
      // // .filter();

      // // const item = await features.query;
      // // console.log(item);
      // let fields = [];
      // // const page = req.query.page * 1 || 1;
      // // const limit = req.query.limit * 1 || 1;
      // // const skip = (page - 1) * limit;
      // if (req.query.fields) {
      //   fields = (req.query.fields as string).split(',');
      // } else {
      //   fields = ['title', 'priority', 'description', 'dueDate'];
      // }
      // const offset = new Pagination(+req.query.limit, +req.query.page).skip();
      // const allItems = await Item.findAll({
      //   where: {
      //     userId: req.session.user.userId,
      //   },
      //   order: [['itemId', 'ASC']],
      //   offset: offset,
      //   limit: +req.query.limit,
      //   attributes: fields,
      // });
      const itemAPI = ItemEntity.fromAPI(req);
      // itemAPI.setItemId(req.params.id);
      itemAPI.setUserId(req.session.user.userId);

      const allItems = await Item.findAll({
        where: { userId: itemAPI.userId },
      });

      const items = allItems.map((el) => {
        return ItemEntity.fromDB(el);
      });

      response(req, res, 200, 'Ok', 'Success', items);
    }
  );
}

export default new ItemController();
