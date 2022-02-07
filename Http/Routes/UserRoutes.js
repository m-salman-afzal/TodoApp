import express from 'express';
// import * as authController from '../Controllers/AuthController.js';
// import * as m_AuthController from '../Controllers/M_AuthController.js';
import M_AuthController from '../Controllers/M_AuthController.js';

const router = express.Router();

// router.route('/signup').post(authController.signUp);
// router.route('/login').post(authController.logIn);

router.route('/signup').post(M_AuthController.signUp);
router.route('/login').post(M_AuthController.logIn);
export { router };
