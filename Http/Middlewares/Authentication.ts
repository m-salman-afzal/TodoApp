import { catchAsync } from '../../Utils/CatchAsync';
import { AppError } from '../../Utils/AppError';
import { User } from '../../Models/Associations';

class Authentication {
  protect = catchAsync(async (req, res, next) => {
    // * check if we get the session cookie which is still valid
    if (!req.session.isAuth) {
      return next(
        new AppError('User is not Logged In! Kindly Login Again', 401)
      );
    }

    // * check if the user still exists in our database
    const currentUser = await User.findByPk(req.session.user.userId);
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
}

export default new Authentication();
