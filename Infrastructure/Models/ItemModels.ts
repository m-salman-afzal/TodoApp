// import { Sequelize, Model, DataTypes } from 'sequelize';
import { sequel } from '../../mysql_db';
import {
  Model,
  InferAttributes,
  InferCreationAttributes,
  DataTypes,
  Association,
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
  ModelDefined,
  Optional,
  Sequelize,
  CreationOptional,
  NonAttribute,
} from 'sequelize';

class Item extends Model<InferAttributes<Item>, InferCreationAttributes<Item>> {
  // declare id: CreationOptional<number>;
  declare itemId: string;
  declare userId: string;
  declare title: string;
  declare priority: string;
  declare description: string;
  declare dueDate: Date;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
}

Item.init(
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
    itemId: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false,
      unique: true,
    },
    userId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    priority: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    dueDate: {
      type: DataTypes.DATE,
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
    tableName: 'items',
    sequelize: sequel,
  }
);
// const itemSchema = sequel.define('items', {
//   itemId: {
//     type: Sequelize.CHAR,
//     primaryKey: true,
//     allowNull: false,
//     unique: true,
//   },
//   userId: {
//     type: Sequelize.CHAR,
//     allowNull: false,

//     references: {
//       model: 'users',
//       key: 'userId',
//     },
//   },
//   title: {
//     type: Sequelize.STRING,
//     allowNull: false,
//     validate: {
//       len: {
//         args: [8, 50],
//         msg: 'Title length must be between 8-50 characters',
//       },
//     },
//   },
//   priority: {
//     type: Sequelize.STRING,
//     allowNull: false,
//     validate: {
//       isIn: {
//         args: [['low', 'medium', 'high']],
//         msg: 'Priorities can only be low, medium or high',
//       },
//     },
//   },
//   description: {
//     type: Sequelize.STRING,
//     allowNull: false,
//   },
//   dueDate: {
//     type: Sequelize.DATE,
//     allowNull: false,
//   },
// });

export { Item };
