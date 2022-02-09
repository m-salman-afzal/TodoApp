import { sequel } from '../mysql_db';
import {
  Model,
  InferAttributes,
  InferCreationAttributes,
  DataTypes,
  HasManyAddAssociationMixin,
  HasManyCountAssociationsMixin,
  HasManyCreateAssociationMixin,
  HasManyGetAssociationsMixin,
  HasManyHasAssociationMixin,
  HasManySetAssociationsMixin,
  HasManyAddAssociationsMixin,
  HasManyHasAssociationsMixin,
  HasManyRemoveAssociationMixin,
  HasManyRemoveAssociationsMixin,
  CreationOptional,
  Association,
  ModelDefined,
  Optional,
  Sequelize,
  NonAttribute,
} from 'sequelize';

import bcrypt from 'bcrypt';
import { Item } from './ItemModels';

class User extends Model<InferAttributes<User>, InferCreationAttributes<User>> {
  // declare id: CreationOptional<number>;
  declare userId: string;
  declare name: string;
  declare userName: string;
  declare role: string;
  declare email: string;
  declare password: string;
  declare passwordConfirm: string;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;

  declare getItems: HasManyGetAssociationsMixin<Item>;
  declare addItem: HasManyAddAssociationMixin<Item, string>;
  declare addItems: HasManyAddAssociationsMixin<Item, string>;
  declare setItems: HasManySetAssociationsMixin<Item, string>;
  declare removeItem: HasManyRemoveAssociationMixin<Item, string>;
  declare removeItems: HasManyRemoveAssociationsMixin<Item, string>;
  declare hasItem: HasManyHasAssociationMixin<Item, string>;
  declare hasItems: HasManyHasAssociationsMixin<Item, string>;
  declare countItems: HasManyCountAssociationsMixin;
  declare createItem: HasManyCreateAssociationMixin<Item, 'userId'>;

  declare items?: NonAttribute<Item[]>;

  declare static associations: {
    items: Association<User, Item>;
  };
}
User.init(
  {
    /**
     * ! code: 'ER_WRONG_AUTO_KEY',
     * ! errno: 1075,
     * ! sqlState: '42000',
     * ! sqlMessage: 'Incorrect table definition; there can be only one auto column and it must be defined as a key',
     */
    // id: {
    //   type: DataTypes.INTEGER.UNSIGNED,
    //   autoIncrement: true,
    // },
    userId: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false,
      unique: true,
    },
    userName: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    role: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    passwordConfirm: {
      type: DataTypes.VIRTUAL,
      allowNull: false,
    },
    createdAt: {
      type: DataTypes.DATE,
    },
    updatedAt: {
      type: DataTypes.DATE,
    },
  },
  {
    tableName: 'users',
    sequelize: sequel,
  }
);
// const userSchema = sequel.define('users', {
//   userId: {
//     type: Sequelize.CHAR,
//     primaryKey: true,
//     allowNull: false,
//     unique: true,
//   },
//   name: {
//     type: Sequelize.STRING,
//     allowNull: false,
//     validate: {
//       len: {
//         args: [3, 20],
//         msg: 'Name length must be between 8-50 characters',
//       },
//     },
//   },
//   userName: {
//     type: Sequelize.STRING,
//     allowNull: false,
//     unique: true,
//     validate: {
//       len: {
//         args: [3, 20],
//         msg: 'Username length must be between 8-20 characters',
//       },
//     },
//   },
//   role: {
//     type: Sequelize.STRING,
//     allowNull: false,
//     defaultValue: 'user',
//     validate: {
//       isIn: {
//         args: [['admin', 'user']],
//         msg: 'User can only be admin or user',
//       },
//     },
//   },
//   email: {
//     type: Sequelize.STRING,
//     allowNull: false,
//     validate: {
//       isEmail: {
//         msg: 'Provide a valid email.',
//       },
//     },
//   },
//   password: {
//     type: Sequelize.STRING,
//     allowNull: false,
//     validate: {
//       len: {
//         args: [8, 20],
//         msg: 'Password must be between 8-20 characters',
//       },
//     },
//   },

//   passwordConfirm: {
//     type: Sequelize.VIRTUAL,
//     allowNull: false,
//     validate: {
//       isSame(el: string) {
//         if (el !== this.password) throw new Error('Passwords are not same!');
//       },
//     },
//   },

//   // passwordChangedAt: {
//   //   type: Sequelize.STRING,
//   // },
//   // passwordResetToken: {
//   //   type: Sequelize.STRING,
//   // },
//   // passwordResetExpires: {
//   //   type: Sequelize.STRING,
//   // },
// });

// userSchema.beforeCreate(async (user) => {
//   user.password = await bcrypt.hash(user.password, 12);
//   user.passwordConfirm = undefined;
// });

// * Password check with DB for login
// User.prototype.correctPassword = async (
//   candidatePassword: string,
//   userPassword: string
// ) => {
//   return await bcrypt.compare(candidatePassword, userPassword);
// };

// User.hasMany(Item, {
//   sourceKey: 'userId',
//   onDelete: 'CASCADE',
// });
// Item.belongsTo(User, { targetKey: 'userId' });

export { User };
