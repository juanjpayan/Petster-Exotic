const mongoose = require('mongoose'),
  validator = require('validator'),
  bcrypt = require('bcryptjs'),
  jwt = require('jsonwebtoken'),
  Pet = require('./pet');

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },
    email: {
      type: String,
      unique: true,
      required: true,
      trim: true,
      lowercase: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error('email is invalid');
        }
      }
    },
    password: {
      type: String,
      required: true,
      trim: true,
      validate(value) {
        if (value.toLowerCase().includes('password')) {
          throw new Error("can't contain 'password'");
        }
        if (value.length < 5) {
          throw new Error('password must be at least 5 characters long.');
        }
        if (value.toLowerCase().includes(User.name.toLowerCase())) {
          throw new Error("can't contain name");
        }
      }
    },
    owner: {
      type: Boolean,
      required: true,
      default: true
    },
    tokens: [
      {
        token: {
          type: String,
          required: true
        }
      }
    ],
    avatar: {
      type: String
    },
    description: {
      type: String
    },
    favUsers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
      }
    ],
    favPets: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Pet'
      }
    ],
    ownedPets: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Pet'
      }
    ]
  },
  {
    timestamps: true
  }
);

// connect pet to owner
userSchema.virtual('pets', {
  ref: Pet,
  localField: '_id',
  foreignField: 'owner'
});

// hide user password/tokens
// userSchema.methods.toJSON = function () {
//   const user = this;
//   const userObject = user.toObject();
//   delete userObject.password;
//   delete userObject.tokens;
//   return userObject;
// };

// add token to user
userSchema.methods.generateAuthToken = async function () {
  const user = this;
  const token = Math.random();
  user.tokens = user.tokens.concat({ token });
  await user.save();
  return token;
};

// find user by email and password
userSchema.statics.findByCredentials = async (email, password) => {
  const user = await User.findOne({ email });
  if (!user) throw new Error("user doesn't exist");
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw new Error('invalid credentials');
  return user;
};

// Middleware
userSchema.pre('save', async function (next) {
  const user = this;
  if (user.isModified('password')) {
    user.password = await bcrypt.hash(user.password, 8);
  }
  next();
});

// Delete owned pets when a user is removed.
userSchema.pre('remove', async function (next) {
  const user = this;
  await Pet.deleteMany({
    owner: user._id
  });
  next();
});

const User = mongoose.model('User', userSchema);
module.exports = User;
