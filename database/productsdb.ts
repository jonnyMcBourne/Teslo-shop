import type { NextApiRequest, NextApiResponse } from "next";
import { db } from ".";
import { Data, IProduct } from "../interfaces";
import { Product } from "../models";
import { SHOP_CONSTANT } from "./constants";

export const getProducts = async (
  req: NextApiRequest,
  res: NextApiResponse<Data>
) => {
  const { gender = "all" } = req.query;
  let condition = {};
  if(gender !== 'all' && SHOP_CONSTANT.validGenders.includes(`${gender}`)){
    condition = {gender};
  }

 
  try {
    await db.connect();
    const products = await Product.find(condition)
      .select("title images price inStock slug -_id")
      .lean();
    await db.disconnect();
    if(!products){
      return res.status(200).json({ message:'there is not products'});
    }

    return res.status(200).json( {products} );
  } catch (error) {
    return console.log("Somethig went wrong", error);
  }
};
export const getProductBySlug = async (
  req: NextApiRequest,
  res: NextApiResponse<Data>,
  slug: string
) => {
  try {
    await db.connect();
    const product = await Product.findOne({ slug });
    await db.disconnect();
    if (!product) {
      return res
        .status(404)
        .json({ message: `there is not a product with ${slug}` });
    }
    return res.status(200).json({ product: product });
  } catch (error) {}
};
export const searchProducts = async (
  req: NextApiRequest,
  res: NextApiResponse<Data>
) => {
  let { q = "" } = req.query;

  if (q.length === 0) {
    return res.json({ message: "must specify the query " });
  }

  q = q.toString().toLowerCase().trim();

  try {
    await db.connect();
    const products = await Product.find({ $text: { $search: q } }).lean();
    if (!products) {
      return res
        .status(400)
        .json({ message: "there is not products with those parameters" });
    }
    await db.disconnect();
    return res.status(200).json({ count: products.length, products: products });
  } catch (error) {
    console.log("Error: ",error);
  }
};

export const getOneProductBySlug=async(slug:string):Promise<IProduct|null>=>{
  await db.connect()
  const product = await Product.findOne({slug}).lean()
  await db.disconnect()
  if(!product){
    return null
  }
  return JSON.parse(JSON.stringify(product))
}

interface ProductSlug{
  slug:string
}
export const getAllProductSlugs = async ():Promise<ProductSlug[]>=>{
  await db.connect();
  const slug = await Product.find().select('slug -_id').lean()
  await db.disconnect();
  return slug
}

export const getProductsByQuery = async ( query:string ):Promise<IProduct[]|null>=>{
    await db.connect();
      const products = await Product.find({ $text: { $search: query } }).lean();
      await db.disconnect();
      if(!products){
        return null
      }
      return JSON.parse(JSON.stringify(products)); 
}
export const getAllProducts = async ():Promise<IProduct[]|null> =>{
  await db.connect()
  const products = await Product.find().lean()
  await db.disconnect();
  if(!products){
    return null
  }
  return JSON.parse(JSON.stringify(products)); 
}