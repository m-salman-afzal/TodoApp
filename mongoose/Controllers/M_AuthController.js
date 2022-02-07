import { userSchema } from '../../Models/UserModels.js';
import { AppError } from '../../Utils/AppError.js';
import { catchAsync } from '../../Utils/CatchAsync.js';

import { v1 as uuidv1 } from 'uuid';
// * Added some comments
const response = (req, res, statusCode, status, message, item) => {
  return res.status(statusCode).json({
    status: status,
    message: message,
    results: item.length,
    session: req.session,
    data: {
      items: item,
    },
  });
};
class M_AuthController {
  signUp = catchAsync(async (req, res, next) => {
    req.body.userId = uuidv1();
    const user = await userSchema.create(req.body);
    response(req, res, 201, 'Created', 'Success', user);
  });

  logIn = catchAsync(async (req, res, next) => {
    // * Check if the user entered the email or password or not
    const { email, password } = req.body;
    if (!email || !password) {
      return next(new AppError('Email or Password not entered!', 404));
    }

    // * check if the user has entered correct email and password
    const user = await userSchema.findOne({
      where: { email: email },
    });

    if (!user || !(await user.correctPassword(password, user.password))) {
      return next(new AppError('Email or Password is Wrong! Try Again.', 404));
    }

    // * Set the session-cookie
    req.session.isAuth = true;
    req.session.user = user;

    response(req, res, 200, 'Ok', 'Success', user);
  });
}

export default new M_AuthController();
