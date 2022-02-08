import { userSchema } from './UserModels';
import { itemSchema } from './ItemModels';

userSchema.hasMany(itemSchema, {
  onDelete: 'CASCADE',
});
itemSchema.belongsTo(userSchema);
