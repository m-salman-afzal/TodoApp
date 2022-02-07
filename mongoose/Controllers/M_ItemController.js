import { itemSchema } from '../../Models/ItemModels.js';
import { AppError } from '../../Utils/AppError.js';
import { catchAsync } from '../../Utils/CatchAsync.js';
import { M_ApiFeatures } from '../../Utils/ApiFeatures.js';
import { Pagination } from '../../Utils/Pagination.js';

import { v1 as uuidv1 } from 'uuid';
const response = (req, res, statusCode, status, message, item) => {
  return res.status(statusCode).json({
    status: status,
    message: message,
    results: item.length,
    data: {
      items: item,
    },
  });
};
class M_ItemController {
  createItem = catchAsync(async (req, res, next) => {
    req.body.itemId = uuidv1();
    req.body.userId = req.session.user.userId;
    const newItem = await itemSchema.create(req.body);
    response(req, res, 201, 'Created', 'Success', newItem);
  });

  readItem = catchAsync(async (req, res, next) => {
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
  });

  updateItem = catchAsync(async (req, res, next) => {
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
  });

  deleteItem = catchAsync(async (req, res, next) => {
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
  });

  readAllItem = catchAsync(async (req, res, next) => {
    // const features = new M_ApiFeatures(itemSchema, req).sort().paginate();
    // .filter();

    // const item = await features.query;
    // console.log(item);
    let fields = [];
    // const page = req.query.page * 1 || 1;
    // const limit = req.query.limit * 1 || 1;
    // const skip = (page - 1) * limit;
    if (req.query.fields) {
      fields = req.query.fields.split(',');
    } else {
      fields = ['title', 'priority', 'description', 'dueDate'];
    }
    const offset = new Pagination(req.query.limit, req.query.page).skip();
    console.log(offset);
    const allItems = await itemSchema.findAll({
      where: {
        userId: req.session.user.userId,
      },
      order: [['itemId', 'ASC']],
      offset: offset,
      limit: req.query.limit * 1 || 1,
      attributes: fields,
    });

    response(req, res, 200, 'Ok', 'Success', allItems);
  });
}

export default new M_ItemController();
