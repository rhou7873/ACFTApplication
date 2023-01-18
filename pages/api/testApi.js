import clientPromise from '../../lib/mongodb';

export default async function handler(req, res) {
    const client = await clientPromise;
    const db = client.db("app-data");
    switch (req.method) {
        case "POST":
        let bodyObject = JSON.parse(req.body);
        let myPost = await db.collection("soldier_data").insertOne(bodyObject);
        res.json(myPost);
        break;
        case "GET":
        const allPosts = await db.collection("soldier_data").find({}).toArray();
        res.json({ status: 200, data: allPosts });
        break;
    }
}
      