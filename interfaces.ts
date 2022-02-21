import sequelize from 'sequelize';

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
  readonly JWT_SECRET: string;
  readonly JWT_EXPIRES_IN: any;
  readonly JWT_COOKIE_EXPIRES_IN: number;
}

interface pagination_I {
  limit(): number;
  pageNo(): number;
  offset(): number;
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

export { config_I, pagination_I, itemFromDb_I, userFromDb_I };
