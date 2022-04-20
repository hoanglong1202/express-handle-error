const mongoose = require('mongoose');
const Schema = mongoose.Schema();

const UserSchema = new Schema({
  username: {
    type: string,
    require: true,
    unique: true,
  },
  email: {
    type: string,
    require: true,
    unique: true,
    lowercase: true,
  },
});

module.exports = mongoose.model('user', UserSchema);
