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
                await db.collection("users").insertOne(body);
                res.status(200).json({ success: "true" });
            } catch (ex: unknown) {
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
            const graders = await db.collection("users")
                                        .find({ role: "Grader" })
                                        .sort({ $natural: -1 })
                                        .toArray();
            res.status(200).json(graders);
            break;
        default:
            res.status(405).json({ error: "Invalid HTTP method " });
            break;
    }
}
      