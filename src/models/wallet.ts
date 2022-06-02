import mongoose from "mongoose";

interface Wallet {
  walletNumber: number;
  amount: number;
}

interface WalletDoc extends mongoose.Document {
  walletNumber: number;
  amount: number;
}

interface WalletModel extends mongoose.Model<WalletDoc> {
  build(attrs: Wallet): WalletDoc;
}

const walletSchema = new mongoose.Schema(
  {
    walletNumber: {
      type: Number,
      required: true,
    },
    amount: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

walletSchema.statics.build = (attrs: Wallet) => {
  return new Wallet(attrs);
};

const Wallet = mongoose.model<WalletDoc, WalletModel>("Wallet", walletSchema);

export { Wallet };