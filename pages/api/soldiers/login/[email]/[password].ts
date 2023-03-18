import clientPromise from 'lib/mongodb';
import { ObjectId } from "mongodb";
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const client = await clientPromise;
    const db = client.db("appData");
    const email = req.query.email;
    const hash = req.query.password;
    switch (req.method) {
        case "GET":
            const users = await db.collection("users")
                                        //@ts-ignore
                                        .findOne({ _id: email, passwordHash: hash });
            if (!users) res.status(401).json({ error: "User email or password not found" })
            else res.status(200).json(users);
            break;
        default:
            res.status(405).json({ error: "Invalid HTTP method " });
            break;
    }
}
      