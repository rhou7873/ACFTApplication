import clientPromise from 'lib/mongodb';
import { ObjectId } from "mongodb";
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const client = await clientPromise;
    const db = client.db("acftData");
    const collection = db.collection("testResults");
    const acft_id = req.query.acft_id as string;
    
    switch (req.method) {
        case "GET":
            let result: any[] = [];
            try {
                await collection.findOne({ acft_id: new ObjectId(acft_id) }, 
                                         { projection: { _id: 0, results: 1 }})
                                .then(queryResult => {
                                        for (let e of queryResult?.results) {
                                            result.push(e);
                                        }
                                     });
            } catch { console.log("error") }
            res.status(200).json(result);
            break;
        default:
            res.status(405).json({ error: "Invalid HTTP method " });
            break;
    }
}
      