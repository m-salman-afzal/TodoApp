import { catchAsync } from '../../../Utils/CatchAsync.js';
import { AppError } from '../../../Utils/AppError.js';
import { userSchema } from '../../../Models/M_UserModels.js';

const protect = catchAsync(async (req, res, next) => {
  // * check if we get the session cookie which is still valid
  if (!req.session.isAuth) {
    return next(new AppError('User is not Logged In! Kindly Login Again', 401));
  }

  // * check if the user still exists in our database
  const currentUser = await userSchema.findByPk(req.session.user.userId);
  console.log(currentUser);
  if (!currentUser) {
    return next(
      new AppError(
        'User with current session does not exist anymore! Kindly login again.',
        401
      )
    );
  }

  next();
});

export { protect };
