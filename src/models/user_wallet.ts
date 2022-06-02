import mongoose from "mongoose";

interface User {
  name: string;
  email: string;
  wallet: number;
}

interface UserDoc extends mongoose.Document {
  name: string;
  email: string;
  wallet: number;
}

interface UserModel extends mongoose.Model<UserDoc> {
  build(attrs: User): UserDoc;
}

const userWalletSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  wallet: {
    type: Number,
    required: true,
  },
});

userWalletSchema.statics.build = (attrs: User) => {
  return new User(attrs);
};

const User = mongoose.model<UserDoc, UserModel>("User", userWalletSchema);

export { User };
