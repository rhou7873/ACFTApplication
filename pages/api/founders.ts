import { NextApiRequest, NextApiResponse } from "next";
import clientPromise from "../../lib/mongodb";

export default async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const client = await clientPromise;
        const db = client.db("appData");
        const founders = await db.collection("founders")
                                 .find({})
                                 .toArray();
        res.status(200).json(founders);
    } catch (e) {
        console.error(e);
    }
}