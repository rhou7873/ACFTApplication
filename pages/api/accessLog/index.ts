import { NextApiRequest, NextApiResponse } from "next";
import clientPromise from "../../../lib/mongodb";

export default async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const client = await clientPromise;
        const collection = client.db("appData").collection("accessLog");
        switch (req.method) {
            case "GET":
                const accessLog = await collection
                                         .find({})
                                         .limit(1000)
                                         .toArray();
                res.status(200).json(accessLog);
            case "POST":
                // TODO: create new access log item
                res.status(201);
        }
    } catch (e) {
        console.error(e);
    }
}