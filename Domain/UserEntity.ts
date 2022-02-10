import { userFromDb_I } from '../interfaces';

class UserEntity {
  public userId: string;
  public name: string;
  public userName: string;
  public role: string;
  public email: string;
  public password: string;
  public passwordConfirm: string;

  // public createdAt: Date;
  // public updatedAt: Date;

  constructor(name: string, userName: string, role: string, email: string) {
    this.name = name;
    this.userName = userName;
    this.role = role;
    this.email = email;
  }

  setPassword(password: string) {
    this.password = password;
  }
  setPasswordConfirm(passwordConfirm: string) {
    this.passwordConfirm = passwordConfirm;
  }

  setUserId(userId: string) {
    this.userId = userId;
  }

  // * factory method when we use data from incoming API call
  // TODO Ask if we can declare type to be of sequelize request or do we need it to be explicit type declarations
  public static fromAPI(obj) {
    return new UserEntity(
      obj.body.name,
      obj.body.userName,
      obj.body.role,
      obj.body.email
    );
  }

  // * factory method when we use data from DB
  public static fromDB(obj: userFromDb_I) {
    return new UserEntity(obj.name, obj.userName, obj.role, obj.email);
  }

  // * Returns the current object
  public static fromObj() {
    return JSON.parse(JSON.stringify(this));
  }
}

export { UserEntity };
