import mongoose from "mongoose";

interface Product {
  name: string;
  price: number;
}

interface ProductDoc extends mongoose.Document {
  name: string;
  price: number;
}

interface ProductModel extends mongoose.Model<ProductDoc> {
  build(attrs: Product): ProductDoc;
}

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

productSchema.statics.build = (attrs: Product) => {
  return new Product(attrs);
};

const Product = mongoose.model<ProductDoc, ProductModel>("User", productSchema);

export { Product };
