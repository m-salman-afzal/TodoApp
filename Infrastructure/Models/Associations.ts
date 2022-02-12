import { User } from './UserModels';
import { Item } from './ItemModels';

User.hasMany(Item, {
  sourceKey: 'userId',
  onDelete: 'CASCADE',
});
Item.belongsTo(User, { targetKey: 'userId' });

export { User, Item };
