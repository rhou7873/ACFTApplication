import clientPromise from 'lib/mongodb';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const client = await clientPromise;
    const db = client.db("appData");
    const collection = db.collection("soldierScores");
    const soldierId = req.query.soldierId as string; 
    const field = req.query.field as string;

    switch (req.method) {
        case "GET":
            const fieldValue = await collection
                                .findOne({ 
                                    // @ts-ignore
                                    user_id: soldierId
                                }, {
                                    projection: {
                                        "_id": 0,
                                        [field]: 1
                                    }
                                });
            res.status(200).json(fieldValue);
            break;
        default:
            res.status(405).json({ error: "Invalid HTTP method " });
            break;
    }
}