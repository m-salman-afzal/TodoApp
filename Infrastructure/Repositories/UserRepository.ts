import { UserEntity } from '../../Domain/UserEntity';
import { User } from '../Models/Associations';

class UserRepository {
  static createUser = async (user: UserEntity) => {
    return User.create(user.fromObj());
  };

  // TODO Ask about the following implementation of using optional email field
  static readUser = async (userId: string, email?: string) => {
    if (!email)
      return User.findOne({
        where: { userId: userId },
      });
    else
      return User.findOne({
        where: { email: email },
      });
  };

  static updateUser = async (
    user: UserEntity,

    userId: string
  ) => {
    return User.update(user.fromObj(), {
      where: { userId: userId },
    });
  };

  static deleteUser = async (userId: string) => {
    return User.destroy({
      where: { userId: userId },
    });
  };

  static readAllUser = async () => {
    return User.findAll();
  };
}

export { UserRepository };
