import dotenv from 'dotenv';
import { Sequelize } from 'sequelize';

dotenv.config({ path: 'config.env' });

const sequelize = new Sequelize(
  process.env.DATABASE_NAME,
  process.env.DATABASE_USERNAME,
  process.env.DATABASE_PASSWORD,
  {
    host: process.env.DATABASE_HOST,
    dialect: 'mysql',
  }
);

export { sequelize };
