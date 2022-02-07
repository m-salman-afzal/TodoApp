import express from 'express';
// import * as itemController from '../Controllers/ItemContoller.js';
// import * as m_ItemController from '../Controllers/M_ItemController.js';
import M_ItemController from '../Controllers/M_ItemController.js';
// import * as authentication from '../Middlewares/Authentication.js';
// import * as authorization from '../Middlewares/Authorization.js';
import * as m_Authentication from '../Middlewares/M_Authentication.js';
import * as m_Authorization from '../Middlewares/M_Authorization.js';
const router = express.Router();

// router
//   .route('/')
//   .post(authentication.protect, itemController.createItem)
//   .get(authentication.protect, itemController.readAllItem);

router
  .route('/')
  .post(m_Authentication.protect, M_ItemController.createItem)
  .get(m_Authentication.protect, M_ItemController.readAllItem);

// * Router Methods for specific ids
// router
//   .route('/:id')
//   .get(itemController.readItem)
//   .patch(itemController.updateItem);
//   .delete(authorization.restricTo('admin'), itemContoller.deleteItem);

// router
//   .route('/:id')
//   .get(m_ItemController.readItem)
//   .patch(m_ItemController.updateItem)
//   .delete(
//     m_Authentication.protect,
//     m_Authorization.restricTo('admin', 'user'),
//     m_ItemController.deleteItem
//   );

export { router };
