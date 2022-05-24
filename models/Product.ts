
import mongoose,{Schema, Model, model} from 'mongoose';
import { IProduct } from '../interfaces';

const productSchema = new Schema({
  description: { type: String, required: true },
  images: [{ type: String }],
  price: { type: Number, required: true, default: 0 },
  inStock: { type: Number, required: true, default: 0 },
  sizes: [
    {
      type: String,
      enum: {
        values: ["XS", "S", "M", "L", "XL", "XXL", "XXL"],
        message: "it's not a permited value",
      },
    },
  ],
  slug: { type: String, required: true, unique: true },
  tags: [{ type: String }],
  title: { type: String, required: true },
  type: [
    {
      type: String,
      enum: { values: ["shirts", "pants", "hoodies", "hats"] },
      message: "{VALUE} is not a valid type",
    },
  ],
  gender: [
    {
      type: String,
      enum: { values: ["men", "women",'kid','unisex'] },
      message: "{VALUE} is not a valid gender",
    },
  ],
},{
      timestamps:true
});

//TODO Create index
productSchema.index({title:'text',tags:'text'})

const Product: Model<IProduct> =
  mongoose.models.Product || model("Product", productSchema);
  export default Product;