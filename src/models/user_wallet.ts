import mongoose, { Types } from "mongoose";

interface User {
  name: string;
  email: string;
  password: string;
  wallet: Types.ObjectId;
}

interface UserDoc extends mongoose.Document {
  name: string;
  email: string;
  password: string;
  wallet: Types.ObjectId;
}

interface UserModel extends mongoose.Model<UserDoc> {
  build(attrs: User): UserDoc;
}

const userWalletSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    wallet: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Wallet",
    },
  },
  {
    timestamps: true,
  }
);

userWalletSchema.statics.build = (attrs: User) => {
  return new User(attrs);
};

const User = mongoose.model<UserDoc, UserModel>("User", userWalletSchema);

export { User };
