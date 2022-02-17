import bcrypt from 'bcrypt';
import express from 'express';
class PasswordEncrypt {
  passEncrypt = async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ): Promise<void> => {
    req.body.password = await bcrypt.hash(req.body.password, 12);
    next();
  };
}

export default new PasswordEncrypt();
