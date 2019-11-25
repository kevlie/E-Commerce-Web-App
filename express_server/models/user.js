const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    minlength: 1,
    trim: true,
    unique: true,
    validate: {
      validator: validator.isEmail, // custom validator
      message: "Not valid email"
    }
  },
  password: {
    type: String,
    required: true,
    minlength: 4
  },
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  }
});

// Mongoose middleware. It's run before saving.
UserSchema.pre("save", function(next) {
  const user = this;

  // checks to ensure we don't hash password more than once
  if (user.isModified("password")) {
    // generate salt and hash the password
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(user.password, salt, (err, hash) => {
        user.password = hash;
        next();
      });
    });
  } else {
    next();
  }
});

// Static Method. Finds a User document by comparing the hashed password
UserSchema.statics.findByEmailPassword = function(email, password) {
  const User = this;

  return User.findOne({ email: email }).then(user => {
    if (!user) {
      return Promise.reject(); // a rejected promise
    }
    return new Promise((resolve, reject) => {
      bcrypt.compare(password, user.password, (err, result) => {
        if (result) {
          resolve(user);
        } else {
          reject();
        }
      });
    });
  });
};

// make a model using the User schema
const User = mongoose.model("User", UserSchema);
module.exports = { User };
