import Pagination from '../../../Utils/Pagination';
interface IUserRepository<inputType, outputType> {
  createUser(user: inputType): Promise<outputType>;
  readUser(userId: string, email?: string): Promise<outputType>;
  updateUser(user: inputType, userId: string): Promise<any>;
  deleteUser(userId: string): Promise<any>;
  readAllUser(pagination: Pagination): Promise<any>;
}

export { IUserRepository };
