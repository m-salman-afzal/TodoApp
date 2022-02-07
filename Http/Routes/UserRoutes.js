import express from 'express';

import authController from '../Controllers/AuthController.js';
import authentication from '../Middlewares/Authentication.js';
import authorization from '../Middlewares/Authorization.js';
import userController from '../Controllers/UserController.js';

const router = express.Router();

router.route('/signup').post(authController.signUp);
router.route('/login').post(authController.logIn);

router
  .route('/')
  .post(
    authentication.protect,
    authorization.restricTo('admin'),
    userController.createUser
  )
  .get(
    authentication.protect,
    authorization.restricTo('admin'),
    userController.readAllUser
  );

router
  .route('/:id')
  .get(
    authentication.protect,
    authorization.restricTo('admin'),
    userController.readUser
  )
  .patch(
    authentication.protect,
    authorization.restricTo('admin'),
    userController.updateUser
  )
  .delete(
    authentication.protect,
    authorization.restricTo('admin'),
    userController.deleteUser
  );
export { router };
