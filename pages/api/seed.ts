// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { db } from "../../database";
import { Product, User } from "../../models";
import { initialData } from "../../database/seed-data";

type Data = {
  message: string;
};

export default async function handler( req: NextApiRequest, res: NextApiResponse<Data>) {
  if (process.env.NODE_ENV === 'production') return ;
  try {
    await db.connect();
    await Product.deleteMany()
    await User.deleteMany()
    await User.insertMany(initialData.users)
    await Product.insertMany(initialData.products)
    await db.disconnect()
    res.status(200).json({ message: "database seeded successfully" });
    
  } catch (error) {
    console.log("error: ",error)
    res.status(500).json({ message: "something went wrong" });
  }
}
