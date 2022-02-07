import { catchAsync } from '../../../Utils/CatchAsync.js';
import { AppError } from '../../../Utils/AppError.js';
import { User } from '../../../Models/UserModels.js';

const protect = catchAsync(async (req, res, next) => {
  console.log(req.session);
  console.log(req.session.isChanged);
  console.log(req.session.isNew);
  console.log(req.session.isPopulated);

  // * check if we get the session cookie which is still valid
  if (!req.session.isAuth) {
    return next(new AppError('User is not Logged In! Kindly Login Again', 401));
  }

  // * check if the user still exists in our database
  const currentUser = await User.findById(req.session.user._id);
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
