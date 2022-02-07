import { Item } from '../../Models/ItemModels.js';
import { catchAsync } from '../../Utils/CatchAsync.js';

const getBase = catchAsync(async (req, res) => {
  const item = await Item.find();
  res.status(200).render('base', {
    item: item,
  });
});

export { getBase };
