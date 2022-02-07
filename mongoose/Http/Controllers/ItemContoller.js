import { Item } from '../../Models/ItemModels.js';
import { AppError } from '../../Utils/AppError.js';
import { catchAsync } from '../../Utils/CatchAsync.js';
import { ApiFeatures } from '../../Utils/ApiFeatures.js';

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

// * Maybe use the following function for multiple places.
// const itemNotFound = (item, message, statusCode, next) => {
//   if (!item) return next(new AppError(message, statusCode));
// };

const createItem = catchAsync(async (req, res, next) => {
  req.body._id = uuidv1();
  const newItem = await Item.create(req.body);
  response(req, res, 201, 'Created', 'Success', newItem);
});

const readItem = catchAsync(async (req, res, next) => {
  const item = await Item.findById(req.params.id);

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

const updateItem = catchAsync(async (req, res, next) => {
  const item = await Item.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
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

const deleteItem = catchAsync(async (req, res, next) => {
  const item = await Item.findByIdAndDelete(req.params.id, (err, docs) => {
    if (err) console.log(err);
    else console.log(`Deleted Doc: ${docs}`);
  });

  // * If no item found with id
  // itemNotFound(
  //   item,
  //   `Item with id: ${req.params.id} cannot be found. Check Id again in URL`,
  //   404
  // );
  if (!item)
    return next(
      new AppError(
        `Item with id: ${req.params.id} cannot be found. Check Id again in URL`,
        404
      )
    );

  response(req, res, 204, 'No Content', 'Success', item);
});

const readAllItem = catchAsync(async (req, res, next) => {
  const features = new ApiFeatures(Item.find(), req.query)
    .sort()
    .paginate()
    .fields()
    .filter();

  const item = await features.query;

  response(req, res, 200, 'Ok', 'Success', item);

  // res.status(statusCode).json({
  //   status: status,
  //   message: message,
  //   results: item.length,
  //   data: {
  //     items: item,
  //   },
  // });
});
export { createItem, readItem, updateItem, deleteItem, readAllItem };
