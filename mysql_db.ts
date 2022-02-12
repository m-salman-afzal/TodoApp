import sequelize from 'sequelize';
import { Sequelize } from 'sequelize';
import { config } from './config';

const sequel: Sequelize = new Sequelize(
  config.DB_MYSQL_NAME,
  config.DB_MYSQL_USERNAME,
  config.DB_MYSQL_PASSWORD,
  {
    host: config.DB_MYSQL_HOST,
    dialect: config.DB_MYSQL_DIALECT,
  }
);

export { sequel };
