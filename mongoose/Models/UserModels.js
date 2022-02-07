import mongoose from 'mongoose';
import validator from 'validator';
import bcrypt from 'bcrypt';

const userSchema = new mongoose.Schema({
  _id: {
    type: String,
  },
  name: {
    type: String,
    maxlength: [20, 'Name is too long. Must be 20 Characters or less.'],
    minlength: [3, 'Name too short. Must be 3 Characters or more.'],
    required: [true, 'User must have a Name'],
    trim: true,
  },
  username: {
    type: String,
    maxlength: [20, 'Username is too long. Must be 20 Characters or less.'],
    minlength: [3, 'Username too short. Must be 3 Characters or more.'],
    required: [true, 'User must have a Username'],
    trim: true,
    unique: true,
  },
  role: {
    type: String,
    enum: {
      values: ['admin', 'user'],
      message: 'Roles can be either admin or user',
    },
    default: 'user',
  },
  email: {
    type: String,
    required: [true, 'User must have a Email'],
    validate: [validator.isEmail, 'Enter a valid Email'],
    trim: true,
  },
  password: {
    type: String,
    required: [true, 'User must have a Password'],
    minlength: [8, 'Password too short. Must be 8 Characters or more.'],
    maxlength: [20, 'Password too long. Must be 20 Characters or less.'],
    select: false,
  },
  passwordConfirm: {
    type: String,
    validate: {
      validator: function (el) {
        return el === this.password;
      },
      message: "Passwords don't match",
    },
  },
  passwordChangedAt: {
    type: Date,
  },
  passwordResetToken: {
    type: String,
  },
  passwordResetExpires: {
    type: Date,
  },
});

// * Document middleware to store encrypted password in database. It performs this operation in between Post request and saving to DB
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 12);
  this.passwordConfirm = undefined;
  next();
});

// * Password check with DB for login
userSchema.methods.correctPassword = async (
  candidatePassword,
  userPassword
) => {
  return await bcrypt.compare(candidatePassword, userPassword);
};

const User = mongoose.model('User', userSchema);

export { User };
