import Sequelize from 'sequelize';
import { sequelize } from '../mysql_db';

const itemSchema = sequelize.define('items', {
  itemId: {
    type: Sequelize.CHAR,
    primaryKey: true,
    allowNull: false,
    unique: true,
  },
  userId: {
    type: Sequelize.CHAR,
    allowNull: false,

    references: {
      model: 'users',
      key: 'userId',
    },
  },
  title: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      len: {
        args: [8, 50],
        msg: 'Title length must be between 8-50 characters',
      },
    },
  },
  priority: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      isIn: {
        args: [['low', 'medium', 'high']],
        msg: 'Priorities can only be low, medium or high',
      },
    },
  },
  description: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  dueDate: {
    type: Sequelize.DATE,
    allowNull: false,
  },
});

export { itemSchema };
