import express from 'express';
import * as AppError from '../../Utils/BaseError';
class PasswordConfirm {
  passConfirm = async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ): Promise<void> => {
    if (req.body.password !== req.body.passwordConfirm)
      throw new AppError.BadRequest(
        'Password and Password Confirm do not match! Kindly try again'
      );

    next();
  };
}
export default new PasswordConfirm();
