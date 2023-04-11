import clientPromise from 'lib/mongodb';
import { MongoServerError } from "mongodb";
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const client = await clientPromise;
    const db = client.db("appData");
    switch (req.method) {
        case "POST":
            try {
                let body = JSON.parse(req.body);
                await db.collection("users").insertOne({ 
                    ...body,
                    active_acft: false,
                    acft_id: "N/A"
                });
                await db.collection("soldierScores").insertOne({
                    user_id: body._id,
                    mdl: -1,
                    spt: -1,
                    hrp: -1,
                    sdc: -1,
                    plk: -1,
                    tmr: -1,
                    totalScore: -1
                });
                res.status(200).json({ success: "true" });
            } catch (ex: unknown) {
                console.log(ex)
                if (ex instanceof MongoServerError) {
                    switch (ex.code) {
                        case 11000:
                            res.status(409).json({ success: "false", error: "Email already exists" });
                            break;
                    }
                }
            }
            break;
        case "GET":
            const soldiers = await db.collection("users")
                                        .find({ role: "Soldier" })
                                        .sort({ $natural: -1 })
                                        .toArray();
            const resResult: any[] = []
            for (let soldier of soldiers) {
                await db.collection("soldierScores")
                    .findOne({ user_id: soldier._id }, {
                        projection: {
                            _id: 0,
                            user_id: 0
                        }
                    })
                    .then(result => {
                        let obj = {
                            _id: soldier._id,
                            firstName: soldier.firstName,
                            lastName: soldier.lastName,
                            birthday: soldier.birthday,
                            gender: soldier.gender,
                            mdl: result?.mdl,
                            spt: result?.spt,
                            hrp: result?.hrp,
                            sdc: result?.sdc,
                            plk: result?.plk,
                            tmr: result?.tmr,
                            totalScore: result?.totalScore
                        }
                        resResult.push(obj)
                    });
            }
            res.status(200).json(resResult);
            break;
        default:
            res.status(405).json({ error: "Invalid HTTP method " });
            break;
    }
}
      