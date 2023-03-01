import clientPromise from 'lib/mongodb';
import { ObjectId } from "mongodb";
import { NextApiRequest, NextApiResponse } from 'next';

enum NumType {
    Float, Int
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const client = await clientPromise;
    const db = client.db("appData");
    const collection = db.collection("soldierData");
    const soldierId = req.query.soldierId as string;
    const newValue = req.query.newValue as string;
    const field = req.query.field as string;
    const numFields: Map<string, Function> = new Map(Object.entries({
        "mdl": (r: string) => parseInt(r),
        "spt": (r: string) => parseFloat(r), 
        "hrp": (r: string) => parseInt(r), 
        "sdc": (r: string) => parseFloat(r), 
        "plk": (r: string) => parseFloat(r), 
        "tmr": (r: string) => parseFloat(r), 
        "score": (r: string) => parseInt(r),
        "age": (r: string) => parseInt(r),
        "ageGroup": (r: string) => parseInt(r)
    }));

    const isNumerical = numFields.get(field) != undefined;
    
    if (isNumerical && isNaN(numFields.get(field)!(newValue))) {
        /* Trying to update a numerical field with not-a-number */
        res.status(200).json({ error: `Can't update ${field} with NaN` });
        return;
    }

    switch (req.method) {
        case "PATCH":
            await collection
                    .updateOne({
                        "_id": new ObjectId(soldierId)
                    }, {
                        "$set": {
                            [field]: isNumerical ? numFields.get(field)!(newValue) : newValue
                        }
                    });
            res.status(200).json({ message: `Updated soldier ${soldierId} ${field} to 
                ${isNumerical ? newValue : numFields.get(field)!(newValue)}` })
            break;
        default:
            res.status(405).json({ error: "Invalid HTTP method" });
            break;
    }
}