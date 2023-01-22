import { NextApiRequest, NextApiResponse } from "next";
import clientPromise from "../../../lib/mongodb";

export default async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const client = await clientPromise;
        const collection = client.db("appData").collection("scoringScale");
        switch (req.method) {
            case "GET":
                const scoringScale = await collection
                                         .find({})
                                         .toArray();
                res.status(200).json(scoringScale);
            case "PATCH":
                // TODO: update item in scoring scale
                res.status(201);
        }
    } catch (e) {
        console.error(e);
    }
}