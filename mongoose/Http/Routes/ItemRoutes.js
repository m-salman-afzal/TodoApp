import express from 'express';
import * as itemController from '../Controllers/ItemContoller.js';
import * as authentication from '../Middlewares/Authentication.js';
import * as authorization from '../Middlewares/Authorization.js';
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
  .delete(authorization.restricTo('admin'), itemController.deleteItem);

export { router };
