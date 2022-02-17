// * packages
import { v1 as uuidv1 } from 'uuid';
import express from 'express';

// * Error Handlers
import { AppError } from '../Utils/AppError';

// * Utils
import Pagination from '../Utils/Pagination';

// * DDD
import { UserEntity } from '../Domain/UserEntity';
import UserRepository from '../Infrastructure/Repositories/UserRepository';

class UserService {
  createUser = async (req: express.Request): Promise<UserEntity> => {
    // * Utilize Entity
    const userAPI = UserEntity.fromAPI(req);
    userAPI.setUserId(uuidv1());
    userAPI.setPassword(req.body.password);
    userAPI.setPasswordConfirm(req.body.passwordConfirm);

    // * Utilize Repository
    const newUser = await UserRepository.createUser(userAPI);

    // * Utilize Entity
    const userDB = UserEntity.fromDB(newUser);

    return userDB;
  };

  readUser = async (
    req: express.Request,
    next: express.NextFunction
  ): Promise<void | UserEntity> => {
    // * Utilize Entity
    const userAPI = UserEntity.fromAPI(req);

    // * Check if the login user's role is from admin or user, if admin, then he can change all users and if user, then he can only change his own credentials.
    if (userAPI.role === 'admin') {
      userAPI.setUserId(req.params.id);
    } else {
      userAPI.setUserId(req.session.user.userId);
    }

    // * Utilize Repository
    const user = await UserRepository.readUser(userAPI.userId);

    // * If no item found with id
    if (!user)
      throw new AppError(
        `User with id: ${req.params.id} cannot be found. Check Id again in URL`,
        404
      );

    // * Utilize Entity
    const userDB = UserEntity.fromDB(user);

    return userDB;
  };

  updateUser = async (
    req: express.Request,
    next: express.NextFunction
  ): Promise<void | UserEntity> => {
    // * Utilize Entity
    const userAPI = UserEntity.fromAPI(req);

    // * Check if the login user's role is from admin or user, if admin, then he can change all users and if user, then he can only change his own credentials.
    if (userAPI.role === 'admin') {
      userAPI.setUserId(req.params.id);
    } else {
      userAPI.setUserId(req.session.user.userId);
    }

    // * Utilize Repository
    const isUpdated = await UserRepository.updateUser(userAPI, userAPI.userId);

    // * If no item found with id
    if (isUpdated[0] === 0)
      throw new AppError(
        `User with id: ${req.params.id} cannot be found. Check Id again in URL`,
        404
      );

    const user = await UserRepository.readUser(userAPI.userId);

    // * Utilize Entity
    const userDB = UserEntity.fromDB(user);

    return userDB;
  };

  deleteUser = async (
    req: express.Request,
    next: express.NextFunction
  ): Promise<number | void> => {
    // * Utilize Entity
    const userAPI = UserEntity.fromAPI(req);
    userAPI.setUserId(req.params.id);

    // * Utilize Repository
    const user = await UserRepository.deleteUser(userAPI.userId);

    // * If no item found with id
    if (!user)
      throw new AppError(
        `Item with id: ${req.params.id} cannot be found. Check Id again in URL`,
        404
      );

    return user;
  };

  readAllUser = async (req: express.Request): Promise<UserEntity[]> => {
    // * Utilize Entity
    const userAPI = UserEntity.fromAPI(req);
    userAPI.setUserId(req.params.id);

    const pagination = new Pagination(
      req.query.limit ? +req.query.limit : 2,
      req.query.page ? +req.query.page : 1
    );

    // * Utilize Repository
    const allUsers = await UserRepository.readAllUser(pagination);

    // * Utilize Entity
    const userDB = allUsers.data.map((el) => {
      return UserEntity.fromDB(el);
    });

    return userDB;
  };
}
export default new UserService();
