import express from 'express';

import itemController from '../Controllers/ItemController';
import authentication from '../Middlewares/Authentication';
import authorization from '../Middlewares/Authorization';

const router = express.Router();

router
  .route('/')
  .post(authentication.protect, itemController.createItem)
  .get(authentication.protect, itemController.readAllItem);

// * Router Methods for specific ids
router
  .route('/:id')
  .get(itemController.readItem)
  .patch(itemController.updateItem)
  .delete(
    authentication.protect,
    authorization.restricTo('admin', 'user'),
    itemController.deleteItem
  );

export { router };
