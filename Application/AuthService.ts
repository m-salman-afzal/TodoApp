// * packages
import express from 'express';
import { v1 as uuidv1 } from 'uuid';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

// * Error Handlers
import { AppError } from '../Utils/AppError';

// * DDD
import { UserEntity } from '../Domain/UserEntity';
import UserRepository from '../Infrastructure/Repositories/UserRepository';

// * Others
import { config } from '../config';

class AuthService {
  signToken = (userId: string) => {
    return jwt.sign({ userId: userId, isAuth: true }, config.JWT_SECRET, {
      expiresIn: config.JWT_EXPIRES_IN,
    });
  };

  signUp = async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    // * Utilize Entity
    const userAPI = UserEntity.fromAPI(req);
    userAPI.setUserId(uuidv1());
    userAPI.setPassword(req.body.password);
    userAPI.setPasswordConfirm(req.body.passwordConfirm);

    // * Utilize Repository
    const newUser = await UserRepository.createUser(userAPI);

    // * Sign token and send it
    const token = this.signToken(newUser.userId);

    // * Utilize Entity
    const userDB = UserEntity.fromDB(newUser);
    return { userDB, token };
  };

  logIn = async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    // * Check if the user entered the email or password or not
    const { email, password } = req.body;

    if (!email || !password) {
      throw new AppError('Email or Password not entered!', 404);
    }

    // * Utilize Entity
    const userAPI = UserEntity.fromAPI(req);

    // * check if the user has entered correct email and password
    const user = await UserRepository.readUser(undefined, userAPI.email);

    // * Password check with DB for login
    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new AppError('Email or Password is Wrong! Try Again.', 404);
    }

    // * Sign token and send it
    const token = this.signToken(user.userId);

    // * Utilize Entity
    const userDB = UserEntity.fromDB(user);
    return { userDB, token };
  };
}

export default new AuthService();
