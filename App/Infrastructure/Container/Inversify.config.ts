import { Container } from 'inversify';
import { TYPES } from '../Repositories/Types';

import { IItemRepository } from '../Repositories/IItemRepository';
import { ItemRepository } from '../Repositories/ItemRepository';
import { IUserRepository } from '../Repositories/IUserRepository';
import { UserRepository } from '../Repositories/UserRepository';
import { ItemEntity } from '../../Domain/ItemEntity';
import { Item } from '../Models/Associations';
import { UserEntity } from '../../Domain/UserEntity';
import { User } from '../Models/Associations';

const itemContainer = new Container();
itemContainer
  .bind<IItemRepository<ItemEntity, Item>>(TYPES.IItemRepository)
  .to(ItemRepository);

const userContainer = new Container();
userContainer
  .bind<IUserRepository<UserEntity, User>>(TYPES.IUserRepository)
  .to(UserRepository);

export { itemContainer, userContainer };
