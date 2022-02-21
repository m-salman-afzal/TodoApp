import Pagination from '../../../Utils/Pagination';
interface IItemRepository<inputType, outputType> {
  createItem(item: inputType): Promise<outputType>;
  readItem(itemId: string, userId: string): Promise<outputType>;
  updateItem(item: inputType, itemId: string, userId: string): Promise<any>;
  deleteItem(itemId: string, userId: string): Promise<any>;
  readAllItem(userId: string, pagination: Pagination): Promise<any>;
}
export { IItemRepository };
