// import { Sequelize, Model, DataTypes } from 'sequelize';
import { sequel } from '../Connections/mysql_db';
import {
  Model,
  InferAttributes,
  InferCreationAttributes,
  DataTypes,
  CreationOptional,
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

export { Item };
