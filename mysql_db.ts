import { Sequelize } from 'sequelize';
import { config } from './config';

const sequelize: any = new Sequelize(
  config.DB_MYSQL_NAME,
  config.DB_MYSQL_USERNAME,
  config.DB_MYSQL_PASSWORD,
  {
    host: config.DB_MYSQL_HOST,
    dialect: config.DB_MYSQL_DIALECT,
  }
);

export { sequelize };
