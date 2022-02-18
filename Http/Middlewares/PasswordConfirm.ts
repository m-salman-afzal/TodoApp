import express from 'express';
import { AppError } from '../../Utils/AppError';
class PasswordConfirm {
  passConfirm = async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ): Promise<void> => {
    if (req.body.password !== req.body.passwordConfirm)
      throw new AppError(
        'Password and Password Confirm do not match! Kindly try again',
        400
      );

    next();
  };
}
export default new PasswordConfirm();
