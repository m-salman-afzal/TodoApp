import { userSchema } from './UserModels.js';
import { itemSchema } from './ItemModels.js';

userSchema.hasMany(itemSchema, {
  onDelete: 'CASCADE',
});
itemSchema.belongsTo(userSchema);
