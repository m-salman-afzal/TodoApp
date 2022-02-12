import { UserEntity } from '../../Domain/UserEntity';
import { User } from '../Models/Associations';

interface userRepository_I<inputType, outputType> {
  createUser(user: inputType): Promise<outputType>;
  readUser(userId: string, email: string): Promise<outputType>;
  updateUser(user: inputType, userId: string): Promise<any>;
  deleteUser(userId: string): Promise<any>;
  readAllUser(): Promise<any>;
}

class UserRepository implements userRepository_I<UserEntity, User> {
  // createUser(user: UserEntity): Promise<UserEntity> {
  //   throw new Error('Method not implemented.');
  // }
  // readUser(userId: string, email: string): Promise<UserEntity> {
  //   throw new Error('Method not implemented.');
  // }
  // updateUser(user: UserEntity, userId: string): Promise<UserEntity> {
  //   throw new Error('Method not implemented.');
  // }
  // deleteUser(userId: string): Promise<UserEntity> {
  //   throw new Error('Method not implemented.');
  // }
  // readAllUser(): Promise<UserEntity> {
  //   throw new Error('Method not implemented.');
  // }
  createUser = async (user: UserEntity): Promise<User> => {
    return User.create(user.fromObj());
  };

  // TODO Ask about the following implementation of using optional email field
  readUser = async (userId: string, email?: string): Promise<User> => {
    if (!email)
      return User.findOne({
        where: { userId: userId },
      });
    else
      return User.findOne({
        where: { email: email },
      });
  };

  updateUser = async (
    user: UserEntity,
    userId: string
  ): Promise<[number, User[]]> => {
    return User.update(user.fromObj(), {
      where: { userId: userId },
    });
  };

  deleteUser = async (userId: string): Promise<number> => {
    return User.destroy({
      where: { userId: userId },
    });
  };

  readAllUser = async (): Promise<User[]> => {
    return User.findAll();
  };
}

export default new UserRepository();
