import { User } from './UserModels';
import { Item } from './ItemModels';

User.hasMany(Item, {
  foreignKey: 'userId',
  // sourceKey: 'userId',
  onDelete: 'CASCADE',
  hooks: true,
});
Item.belongsTo(User, {
  // targetKey: 'userId',
  foreignKey: 'userId',
});

export { User, Item };
