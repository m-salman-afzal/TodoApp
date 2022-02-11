import { ItemEntity } from '../../Domain/ItemEntity';
import { Item } from '../Models/Associations';

class ItemRepository {
  static createItem = async (item: ItemEntity) => {
    return Item.create(item.fromObj());
  };

  static readItem = async (itemId: string, userId: string) => {
    return Item.findOne({
      where: { itemId: itemId, userId: userId },
    });
  };

  static updateItem = async (
    item: ItemEntity,
    itemId: string,
    userId: string
  ) => {
    return Item.update(item.fromObj(), {
      where: { itemId: itemId, userId: userId },
    });
  };

  static deleteItem = async (itemId: string, userId: string) => {
    return Item.destroy({
      where: { itemId: itemId, userId: userId },
    });
  };

  static readAllItem = async (userId: string) => {
    return Item.findAll({
      where: { userId },
    });
  };
}

export { ItemRepository };
