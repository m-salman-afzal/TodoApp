// * packages
import express from 'express';

// * Error Handlers
import { AppError } from '../Utils/AppError';

// * DDD
import { UserEntity } from '../Domain/UserEntity';
import UserRepository from '../Infrastructure/Repositories/UserRepository';

class AuthService {
  logIn = async (req: express.Request, next: express.NextFunction) => {
    // * Check if the user entered the email or password or not
    const { email, password } = req.body;
    console.log(email, password);
    if (!email || !password) {
      return next(new AppError('Email or Password not entered!', 404));
    }
    // * Utilize Entity
    const userAPI = UserEntity.fromAPI(req);

    // * check if the user has entered correct email and password
    const user = await UserRepository.readUser(undefined, userAPI.email);

    // if (!user || !(await user.correctPassword(password, user.password))) {
    //   return next(
    //     new AppError('Email or Password is Wrong! Try Again.', 404)
    //   );
    // }

    // * Set the session-cookie
    req.session.isAuth = true;
    req.session.user = user;

    const userDB = UserEntity.fromDB(user);
    return userDB;
  };
}

export default new AuthService();
