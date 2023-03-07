// not final

import { NextApiRequest, NextApiResponse } from "next";
import clientPromise from "lib/mongodb";

export default async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const gender = req.query.gender;
        const test = req.query.test;
        if ((gender !== "female" && gender !== "male") ||
            (test !== "mdl" && test !== "plk" && test !== "spt" && test !== "2mr" &&
                test !== "sdc" && test !== "hrp")) {
            throw new Error("Invalid query parameter");
        }
        const client = await clientPromise;
        const collection = client.db("appData").collection("scoringScale");
        const noID = { _id: 0 };
        switch (req.method) {
            case "GET":
                const scoringScale = await collection
                                         .find({ "testAbbreviation": test })
                                         .project(gender === "female" ? { _id: 0, fscores: 1 } : { _id: 0, mscores: 1 })
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