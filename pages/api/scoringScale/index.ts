import { NextApiRequest, NextApiResponse } from "next";
import clientPromise from "../../../lib/mongodb";

export default async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const client = await clientPromise;
        const collection = client.db("appData").collection("scoringScale");
        switch (req.method) {
            case "GET":
                const accessLog = await collection
                                         .find({})
                                         .limit(1000)
                                         .toArray();
                res.status(200).json(accessLog);
            case "PATCH":
                // TODO: update item in scoring scale
                res.status(201);
        }
    } catch (e) {
        console.error(e);
    }
}