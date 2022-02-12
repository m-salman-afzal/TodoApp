import { ItemEntity } from '../../Domain/ItemEntity';
import { Item } from '../Models/Associations';

interface itemRepository_I<inputType, outputType> {
  createItem(item: inputType): Promise<outputType>;
  readItem(itemId: string, userId: string): Promise<outputType>;
  updateItem(item: inputType, itemId: string, userId: string): Promise<any>;
  deleteItem(itemId: string, userId: string): Promise<any>;
  readAllItem(userId: string): Promise<any>;
}

class ItemRepository implements itemRepository_I<ItemEntity, Item> {
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

  readAllItem = async (userId: string): Promise<Item[]> => {
    return Item.findAll({
      where: { userId },
    });
  };
}

export default new ItemRepository();
