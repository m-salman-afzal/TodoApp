import express from 'express';

import authController from '../Controllers/AuthController';
import authentication from '../Middlewares/Authentication';
import authorization from '../Middlewares/Authorization';
import userController from '../Controllers/UserController';
import PasswordEncrypt from '../Middlewares/PasswordEncrypt';
import PasswordConfirm from '../Middlewares/PasswordConfirm';
const router = express.Router();

router
  .route('/signup')
  .post(
    PasswordConfirm.passConfirm,
    PasswordEncrypt.passEncrypt,
    authController.signUp
  );
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
    authorization.restricTo('admin', 'user'),
    userController.readUser
  )
  .patch(
    authentication.protect,
    authorization.restricTo('admin', 'user'),
    userController.updateUser
  )
  .delete(
    authentication.protect,
    authorization.restricTo('admin'),
    userController.deleteUser
  );
export { router };
