import type { NextApiRequest, NextApiResponse } from 'next'
import { searchProducts } from '../../../database';
import { Data } from '../../../interfaces';



export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
    switch (req.method) {
        case 'GET':
            return searchProducts(req,res);
        default:
            return res.status(400).json({ message: 'Bad Request' })
    }
}