// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { getProducts } from "../../../database";
import { Data } from "../../../interfaces";

export default function handler( req: NextApiRequest, res: NextApiResponse<Data>) {
  switch (req.method) {
    case 'GET':
      return getProducts(req,res);
    default:
    return res.status(400).json({ message: "bad request" });
  }

}
