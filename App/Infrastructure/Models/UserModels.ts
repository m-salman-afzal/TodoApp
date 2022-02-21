import { sequel } from '../Database/Connections/mysql_db';
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
  NonAttribute,
} from 'sequelize';

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

export { User };
