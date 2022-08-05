import mongoose from '../config/database';

const { Schema } = mongoose;

const UserSchema = new Schema(
  {
    _id: { type: String },
    fullname: { type: String, required: 'Fullname cannot be null' },
    email: {
      type: String,
      required: 'E-mail address cannot be null',
      unique: true
    },
    username: { type: String, required: 'Username cannot be null' },
    password: { type: String, required: 'Password cannot be null' },
    role: { type: String, enum: ['buyer', 'seller'] },
    deposit: { type: String, default: 0 }
  },
  {
    toJSON: {
      transform: (doc, obj) => {
        delete obj.__v;
        delete obj.password;
        delete obj.role;
      }
    }
  }
);

const User = mongoose.model('user', UserSchema);

UserSchema.statics.of = (data) => new User(data);

export default User;
