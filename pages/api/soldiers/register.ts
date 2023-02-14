import clientPromise from '../../../lib/mongodb';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const client = await clientPromise;
    const db = client.db("appData");
    switch (req.method) {
        case "POST":
            let bodyObject = JSON.parse(req.body);
            let myPost = await db.collection("soldierData").insertOne(bodyObject);
            res.status(200).json(myPost);
            break;
        default:
            res.status(405).json({ error: "Invalid HTTP method " });
            break;
    }
}
      