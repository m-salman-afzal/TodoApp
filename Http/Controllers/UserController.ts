import { User } from '../../Models/Associations';
import { AppError } from '../../Utils/AppError';
import { catchAsync } from '../../Utils/CatchAsync';
import { Pagination } from '../../Utils/Pagination';

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
  createUser = catchAsync(async (req, res, next) => {
    req.body.userId = uuidv1();
    const newUser = await User.create(req.body);
    response(req, res, 201, 'Created', 'Success', newUser);
  });

  readUser = catchAsync(async (req, res, next) => {
    const user = await User.findOne({
      where: { userId: req.params.id },
    });

    // * If no item found with id
    if (!user)
      return next(
        new AppError(
          `Item with id: ${req.params.id} cannot be found. Check Id again in URL`,
          404
        )
      );

    response(req, res, 200, 'Ok', 'Success', user);
  });

  updateUser = catchAsync(async (req, res, next) => {
    const isUpdated = await User.update(req.body, {
      where: { userId: req.params.id },
    });

    // * If no item found with id
    if (isUpdated[0] === 0)
      return next(
        new AppError(
          `Item with id: ${req.params.id} cannot be found. Check Id again in URL`,
          404
        )
      );

    const user = await User.findByPk(req.params.id);

    response(req, res, 200, 'Ok', 'Success', user);
  });

  deleteUser = catchAsync(async (req, res, next) => {
    const user = await User.destroy({
      where: { userId: req.params.id },
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
  });

  readAllUser = catchAsync(async (req, res, next) => {
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
      fields = ['name', 'userName', 'email'];
    }
    const offset = new Pagination(req.query.limit, req.query.page).skip();
    const allUsers = await User.findAll({
      order: [['userId', 'ASC']],
      offset: offset,
      limit: req.query.limit * 1 || 1,
      attributes: fields,
    });

    response(req, res, 200, 'Ok', 'Success', allUsers);
  });
}

export default new UserController();
