import { setCookie } from "cookies-next";
import clientPromise from 'lib/mongodb';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const client = await clientPromise;
    const db = client.db("appData");
    const email = req.query.email;
    
    switch (req.method) {
        case "GET":
            const user = await db.collection("users")
                                        //@ts-ignore
                                        .findOne({ _id: email });
            let success = "true";
            if (!user) {
                success = "false";
            }
            res.status(200).json({ success: success, user: user });
            break;
        default:
            res.status(405).json({ error: "Invalid HTTP method " });
            break;
    }
}
      