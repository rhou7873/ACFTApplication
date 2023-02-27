import clientPromise from 'lib/mongodb';
import { ObjectId } from "mongodb";
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const client = await clientPromise;
    const db = client.db("appData");
    const soldierId = req.query.soldierId as string; 
    switch (req.method) {
        case "GET":
            const soldier = await db.collection("soldierData")
                                        .findOne({ "_id": new ObjectId(soldierId) })
            res.status(200).json(soldier);
            break;
        default:
            res.status(405).json({ error: "Invalid HTTP method" });
            break;
    }
}
      