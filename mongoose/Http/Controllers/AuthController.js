import { User } from '../../Models/UserModels.js';
import { AppError } from '../../Utils/AppError.js';
import { catchAsync } from '../../Utils/CatchAsync.js';

import { v1 as uuidv1 } from 'uuid';

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

const signUp = catchAsync(async (req, res, next) => {
  req.body._id = uuidv1();
  const user = await User.create(req.body);
  console.log(user);
  response(req, res, 201, 'Created', 'Success', user);
});

const logIn = catchAsync(async (req, res, next) => {
  // * Check if the user entered the email or password or not
  const { email, password } = req.body;
  if (!email || !password) {
    return next(new AppError('Email or Password not entered!', 404));
  }

  // * check if the user has entered correct email and password
  const user = await User.findOne({ email: email }).select('+password');

  if (!user || !(await user.correctPassword(password, user.password))) {
    return next(new AppError('Email or Password is Wrong! Try Again.', 404));
  }

  // * Set the session-cookie
  req.session.isAuth = true;
  req.session.user = user;

  response(req, res, 200, 'Ok', 'Success', user);
});

export { signUp, logIn };
