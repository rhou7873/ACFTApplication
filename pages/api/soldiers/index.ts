import clientPromise from '../../../lib/mongodb';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const client = await clientPromise;
    const db = client.db("appData");
    switch (req.method) {
        case "POST":
            let bodyObject = JSON.parse(req.body);
            let myPost = await db.collection("soldierData").insertOne(bodyObject);
            res.json(myPost);
            break;
        case "GET":
            const allPosts = await db.collection("soldierData")
                                        .find({})
                                        .sort({ $natural: -1 })
                                        .toArray();
            res.status(200).json(allPosts);
            break;
    }
}
      