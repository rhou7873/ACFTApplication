import clientPromise from 'lib/mongodb';
import { ObjectId } from "mongodb";
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const client = await clientPromise;
    const db = client.db("appData");
    const soldierId = req.query.soldierId as string; 
    switch (req.method) {
        case "GET":
            const data = await db.collection("users")
                                        // @ts-ignore
                                        .findOne({ _id: soldierId }, {
                                            projection: {
                                                _id: 0,
                                                role: 0,
                                                passwordHash: 0
                                            }
                                        });
            const results = await db.collection("soldierScores")
                                        .findOne({ user_id: soldierId }, {
                                            projection: {
                                                _id: 0,
                                                user_id: 0
                                            }
                                        });
            if (!data || !results)  {
                res.status(404).json({ error: `Error getting soldier with _id ${soldierId}` })
            } else {
                res.status(200).json({ 
                   _id: soldierId,
                   firstName: data.firstName,
                   lastName: data.lastName,
                   birthday: data.birthday,
                   gender: data.gender,
                   mdl: results.mdl,
                   spt: results.spt,
                   hrp: results.hrp,
                   sdc: results.sdc,
                   plk: results.plk,
                   tmr: results.tmr,
                   totalScore: results.totalScore
                });
            }
            break;
        default:
            res.status(405).json({ error: "Invalid HTTP method" });
            break;
    }
}
      