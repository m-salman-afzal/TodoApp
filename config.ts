import dotenv from 'dotenv';
import sequelize from 'sequelize';
import { config_I } from './interfaces';

dotenv.config({ path: 'config.env' });

const config: config_I = {
  NODE_ENV: process.env.NODE_ENV,
  IP: process.env.IP,
  PORT: process.env.PORT,
  DB_MONGO_USERNAME: process.env.DB_MONGO_USERNAME,
  DB_MONGO_CLOUD: process.env.DB_MONGO_CLOUD,
  DB_MONGO_LOCAL: process.env.DB_MONGO_LOCAL,
  DB_MONGO_PASSWORD: process.env.DB_MONGO_PASSWORD,
  DB_MYSQL_NAME: process.env.DB_MYSQL_NAME,
  DB_MYSQL_USERNAME: process.env.DB_MYSQL_USERNAME,
  DB_MYSQL_PASSWORD: process.env.DB_MYSQL_PASSWORD,
  DB_MYSQL_HOST: process.env.DB_MYSQL_HOST,
  DB_MYSQL_DIALECT: process.env.DB_MYSQL_DIALECT as sequelize.Dialect,
  JWT_SECRET: process.env.JWT_SECRET,
  JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN,
  JWT_COOKIE_EXPIRES_IN: +process.env.JWT_COOKIE_EXPIRES_IN,
};

export { config };
