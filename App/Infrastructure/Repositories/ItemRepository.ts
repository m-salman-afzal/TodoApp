// * Packages
import { injectable, inject } from 'inversify';
import 'reflect-metadata';

// * Utils
import Pagination from '../../../Utils/Pagination';
import PaginationInfo from '../../../Utils/PaginationInfo';

// * DDD
import { ItemEntity } from '../../Domain/ItemEntity';
import { Item } from '../Models/Associations';
import { IItemRepository } from './IItemRepository';

@injectable()
class ItemRepository implements IItemRepository<ItemEntity, Item> {
  createItem = async (item: ItemEntity): Promise<Item> => {
    return Item.create(item.fromObj());
  };

  readItem = async (itemId: string, userId: string): Promise<Item> => {
    return Item.findOne({
      where: { itemId: itemId, userId: userId },
    });
  };

  updateItem = async (
    item: ItemEntity,
    itemId: string,
    userId: string
  ): Promise<[number, Item[]]> => {
    return Item.update(item.fromObj(), {
      where: { itemId: itemId, userId: userId },
    });
  };

  deleteItem = async (itemId: string, userId: string): Promise<number> => {
    return Item.destroy({
      where: { itemId: itemId, userId: userId },
    });
  };

  readAllItem = async (userId: string, pagination: Pagination) => {
    const items = await Item.findAndCountAll({
      limit: pagination.limit(),
      offset: pagination.offset(),
      where: { userId },
    });

    const paginationInfo = new PaginationInfo<Item>(
      pagination.limit(),
      pagination.pageNo(),
      items.count,
      items.rows
    );

    return paginationInfo.getPaginationInfo();
  };
}

export { ItemRepository };
