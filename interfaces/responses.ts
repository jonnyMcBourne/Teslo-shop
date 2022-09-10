import { IProduct } from "./products";

export type Data =
  | { message: string }
  | { products: IProduct[]; count: number }
  | {products: IProduct[]} 
  | { product: IProduct };
