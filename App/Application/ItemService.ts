// * packages
import { v1 as uuidv1 } from 'uuid';
import express from 'express';

// * Error Handlers
import * as AppError from '../../Utils/BaseError';

// * Utils
import Pagination from '../../Utils/Pagination';

// * DDD
import { ItemEntity } from '../Domain/ItemEntity';
import { itemContainer } from '../Infrastructure/Container/Inversify.config';
import { IItemRepository } from '../Infrastructure/Repositories/IItemRepository';
import { TYPES } from '../Infrastructure/Repositories/Types';
import { Item } from '../Infrastructure/Models/Associations';

class ItemService {
  createItem = async (req: express.Request): Promise<ItemEntity> => {
    // * Utilize Entity

    const itemAPI = ItemEntity.fromAPI(req);
    itemAPI.setItemId(uuidv1());
    itemAPI.setUserId(req.body.user.userId);

    // * Utilize Repository
    // const newItem = await ItemRepository.createItem(itemAPI);
    const itemContain = itemContainer.get<IItemRepository<ItemEntity, Item>>(
      TYPES.IItemRepository
    );
    const newItem = await itemContain.createItem(itemAPI);

    // * Utilize Entity
    const itemDB = ItemEntity.fromDB(newItem);

    return itemDB;
  };

  readItem = async (req: express.Request): Promise<void | ItemEntity> => {
    // * Utilize Entity
    const itemAPI = ItemEntity.fromAPI(req);
    itemAPI.setItemId(req.params.id);
    itemAPI.setUserId(req.body.user.userId);

    // * Utilize Repository
    // const item = await ItemRepository.readItem(itemAPI.itemId, itemAPI.userId);
    const itemContain = itemContainer.get<IItemRepository<ItemEntity, Item>>(
      TYPES.IItemRepository
    );
    const item = await itemContain.readItem(itemAPI.itemId, itemAPI.userId);

    // * If no item found with id
    if (!item)
      throw new AppError.BadRequest(
        `Item with itemId: ${req.params.id} for user with userId: ${req.body.user.userId} with cannot be found. Check Id again in URL`
      );

    // * Utilize Entity
    const itemDB = ItemEntity.fromDB(item);

    return itemDB;
  };

  updateItem = async (req: express.Request): Promise<void | ItemEntity> => {
    // * Utilize Entity
    const itemAPI = ItemEntity.fromAPI(req);
    itemAPI.setItemId(req.params.id);
    itemAPI.setUserId(req.body.user.userId);

    // * Utilize Repository

    // const isUpdated = await ItemRepository.updateItem(
    //   itemAPI,
    //   itemAPI.itemId,
    //   itemAPI.userId
    // );

    const itemContain = itemContainer.get<IItemRepository<ItemEntity, Item>>(
      TYPES.IItemRepository
    );

    const isUpdated = await itemContain.updateItem(
      itemAPI,
      itemAPI.itemId,
      itemAPI.userId
    );

    // * If no item found with id
    if (isUpdated[0] === 0)
      throw new AppError.NotFound(
        `Item with id: ${req.params.id} cannot be found. Check Id again in URL`
      );

    // * Utilize Entity
    // const item = await ItemRepository.readItem(itemAPI.itemId, itemAPI.userId);

    const item = await itemContain.readItem(itemAPI.itemId, itemAPI.userId);

    const itemDB = ItemEntity.fromDB(item);

    return itemDB;
  };

  deleteItem = async (req: express.Request): Promise<number | void> => {
    // * Utilize Entity
    const itemAPI = ItemEntity.fromAPI(req);
    itemAPI.setItemId(req.params.id);
    itemAPI.setUserId(req.body.user.userId);

    // * Utilize Repository
    const itemContain = itemContainer.get<IItemRepository<ItemEntity, Item>>(
      TYPES.IItemRepository
    );
    const item = await itemContain.deleteItem(itemAPI.itemId, itemAPI.userId);

    // * If no item found with id
    if (!item)
      throw new AppError.NotFound(
        `Item with id: ${req.params.id} cannot be found. Check Id again in URL`
      );
    return item;
  };

  readAllItem = async (req: express.Request) => {
    // * Utilize Entity
    const itemAPI = ItemEntity.fromAPI(req);
    itemAPI.setUserId(req.body.user.userId);

    const pagination = new Pagination(
      req.query.limit ? +req.query.limit : 2,
      req.query.page ? +req.query.page : 1
    );

    // * Utilize Repository
    const itemContain = itemContainer.get<IItemRepository<ItemEntity, Item>>(
      TYPES.IItemRepository
    );
    const allItems = await itemContain.readAllItem(itemAPI.userId, pagination);

    // * Utilize Entity
    const itemDB = allItems.data.map((el) => {
      return ItemEntity.fromDB(el);
    });

    console.log(allItems);
    return itemDB;
  };
}
export default new ItemService();
