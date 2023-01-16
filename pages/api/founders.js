import clientPromise from "../../lib/mongodb";

export default async (req, res) => {
    try {
        const client = await clientPromise;
        const db = client.db("app-data");
        const founders = await db.collection("founders")
                                 .find({})
                                 .project({ _id: 0 })
                                 .toArray();
        res.json(founders);
    } catch (e) {
        console.error(e);
    }
}