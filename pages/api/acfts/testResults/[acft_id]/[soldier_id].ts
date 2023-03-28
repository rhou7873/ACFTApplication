import clientPromise from 'lib/mongodb';
import { ObjectId } from "mongodb";
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const client = await clientPromise;
    const db = client.db("acftData");
    const collection = db.collection("testResults");
    const acft_id = req.query.acft_id as string;
    const soldier_id = req.query.soldier_id as string;

    switch (req.method) {
        case "PATCH":
            
            
            break;
        default:
            res.status(405).json({ error: "Invalid HTTP method " });
            break;
    }
}
      