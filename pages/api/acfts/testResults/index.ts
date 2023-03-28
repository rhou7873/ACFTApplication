import clientPromise from 'lib/mongodb';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const client = await clientPromise;
    const db = client.db("acftData");
    const collection = db.collection("testResults");
    switch (req.method) {
        case "GET":
            let acfts = await collection.find({}, {
                                            projection: { _id: 0 }
                                        })
                                        .toArray();
            res.status(200).json(acfts);
            break;
        default:
            res.status(405).json({ error: "Invalid HTTP method " });
            break;
    }
}
      