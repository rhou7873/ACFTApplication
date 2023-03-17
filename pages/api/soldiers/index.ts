import clientPromise from 'lib/mongodb';
import { MongoServerError } from "mongodb";
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const client = await clientPromise;
    const db = client.db("appData");
    switch (req.method) {
        case "POST":
            try {
                let bodyObject = JSON.parse(req.body);
                let myPost = await db.collection("users").insertOne(bodyObject);
                res.json(myPost);
            } catch (ex: unknown) {
                if (ex instanceof MongoServerError) {
                    switch (ex.code) {
                        case 11000:
                            console.log("email already exists")
                            res.status(409).json({ error: "Email already exists" });
                            break;
                    }
                }
            }
            break;
        case "GET":
            const allPosts = await db.collection("soldierData")
                                        .find({})
                                        .sort({ $natural: -1 })
                                        .toArray();
            res.status(200).json(allPosts);
            break;
        default:
            res.status(405).json({ error: "Invalid HTTP method " });
            break;
    }
}
      