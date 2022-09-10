import type { NextApiRequest, NextApiResponse } from 'next'
import { getProductBySlug } from '../../../database';
import { Data, IProduct } from '../../../interfaces';



export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
    const {slug} = req.query;
    switch (req.method) {
        case 'GET':
            return getProductBySlug(req,res,`${slug}`)
        default:
            break;
    }

}

