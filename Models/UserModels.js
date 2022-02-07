import Sequelize from 'sequelize';
import bcrypt from 'bcrypt';

import { sequelize } from '../mysql_db.js';

const userSchema = sequelize.define(
  'users',
  {
    userId: {
      type: Sequelize.CHAR,
      primaryKey: true,
      allowNull: false,
      unique: true,
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        len: {
          args: [3, 20],
          msg: 'Name length must be between 8-50 characters',
        },
      },
    },
    userName: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
      validate: {
        len: {
          args: [3, 20],
          msg: 'Username length must be between 8-20 characters',
        },
      },
    },
    role: {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: 'user',
      validate: {
        isIn: {
          args: [['admin', 'user']],
          msg: 'User can only be admin or user',
        },
      },
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        isEmail: {
          msg: 'Provide a valid email.',
        },
      },
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        len: {
          args: [8, 20],
          msg: 'Password must be between 8-20 characters',
        },
      },
    },

    passwordConfirm: {
      type: Sequelize.VIRTUAL,
      allowNull: false,
      validate: {
        isSame(el) {
          if (el !== this.password) throw new Error('Passwords are not same!');
        },
      },
    },

    // passwordChangedAt: {
    //   type: Sequelize.STRING,
    // },
    // passwordResetToken: {
    //   type: Sequelize.STRING,
    // },
    // passwordResetExpires: {
    //   type: Sequelize.STRING,
    // },
  },
  { fields: ['name', 'userName', 'email', 'password'] }
);

userSchema.beforeCreate(async (user) => {
  user.password = await bcrypt.hash(user.password, 12);
  user.passwordConfirm = undefined;
});

// * Password check with DB for login
userSchema.prototype.correctPassword = async (
  candidatePassword,
  userPassword
) => {
  return await bcrypt.compare(candidatePassword, userPassword);
};

export { userSchema };
