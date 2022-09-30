const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },

  email: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
 
  password: {
    type: String,
    required: true,
    trim: true,
  },

  register: {
    type: Date,
    default: Date.now(),
  },
});

UserSchema.method("toJSON", function () {
  const { __v, _id, ...object } = this.toObject();
  object.id = _id;
  return object;
});

module.exports = mongoose.model("User", UserSchema);
