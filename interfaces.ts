import sequelize from 'sequelize';
import Pagination from './Utils/Pagination';

interface config_I {
  readonly NODE_ENV: string;
  readonly IP: string;
  readonly PORT: string;
  readonly DB_MONGO_USERNAME?: string;
  readonly DB_MONGO_CLOUD?: string;
  readonly DB_MONGO_LOCAL?: string;
  readonly DB_MONGO_PASSWORD?: string;
  readonly DB_MYSQL_NAME?: string;
  readonly DB_MYSQL_USERNAME?: string;
  readonly DB_MYSQL_PASSWORD?: string;
  readonly DB_MYSQL_HOST?: string;
  readonly DB_MYSQL_DIALECT?: sequelize.Dialect;
}

interface pagination_I {
  limit(): number;
  pageNo(): number;
  offset(): number;
  end(): number;
}

interface itemFromDb_I {
  title: string;
  priority: string;
  description: string;
  dueDate: Date;
}

interface userFromDb_I {
  name: string;
  userName: string;
  role: string;
  email: string;
}

interface itemRepository_I<inputType, outputType> {
  createItem(item: inputType): Promise<outputType>;
  readItem(itemId: string, userId: string): Promise<outputType>;
  updateItem(item: inputType, itemId: string, userId: string): Promise<any>;
  deleteItem(itemId: string, userId: string): Promise<any>;
  readAllItem(userId: string, pagination: Pagination): Promise<any>;
}

interface userRepository_I<inputType, outputType> {
  createUser(user: inputType): Promise<outputType>;
  readUser(userId: string, email: string): Promise<outputType>;
  updateUser(user: inputType, userId: string): Promise<any>;
  deleteUser(userId: string): Promise<any>;
  readAllUser(): Promise<any>;
}

export {
  config_I,
  pagination_I,
  itemFromDb_I,
  userFromDb_I,
  itemRepository_I,
  userRepository_I,
};
