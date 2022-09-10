import type { NextApiRequest, NextApiResponse } from 'next'
import { Data } from '../../../interfaces'


export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
    res.status(400).json({ message: 'must specify the search query' })
}