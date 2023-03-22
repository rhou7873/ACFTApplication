import clientPromise from 'lib/mongodb';
import { MongoServerError, ObjectId } from "mongodb";
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const client = await clientPromise;
    const db = client.db("appData");
    switch (req.method) {
        case "POST":
            let body = JSON.parse(req.body);
            let acftId: ObjectId;
            await db.collection("acfts").insertOne(body)
                .then(res => {
                    acftId = res.insertedId;
                    let soldiers: string[] = body.soldiers;
                    db.collection("testResults").insertOne({
                        acft_id: acftId,
                        results: soldiers.map((soldier: string) => {
                            return {
                                user_id: soldier,
                                mdl: -1,
                                spt: -1,
                                hrp: -1,
                                sdc: -1,
                                plk: -1,
                                tmr: -1,
                                totalScore: -1
                            }
                        })
                    });
                });
                res.status(200).json({ success: "true" });
            break;
        default:
            res.status(405).json({ error: "Invalid HTTP method " });
            break;
    }
}
      