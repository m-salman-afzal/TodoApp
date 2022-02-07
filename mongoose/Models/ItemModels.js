import mongoose from 'mongoose';

// * Init a Schema
const itemSchema = new mongoose.Schema({
  _id: {
    type: String,
  },
  title: {
    type: String,
    required: [true, 'A Todo item must have a Title'],
    maxlength: [50, 'Length of Title must be less than 50 Characters'],
    minlength: [8, 'Length of Title must be greater than 8 Characters'],
    trim: true,
  },
  priority: {
    type: String,
    enum: {
      values: ['low', 'medium', 'high'],
      message: 'Priority must be low, medium or high.',
    },
    default: 'low',
    trim: true,
  },
  description: {
    type: String,
    trim: true,
  },
  dueDate: {
    type: Date,
  },
});

const Item = mongoose.model('Item', itemSchema);

export { Item };
