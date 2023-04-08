import { getCookie, setCookie } from "cookies-next";
import clientPromise from 'lib/mongodb';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const client = await clientPromise;
    const db = client.db("appData");
    const email = req.query.email;
    const hash = req.query.password;
    switch (req.method) {
        case "GET":
            const user = await db.collection("users")
                                        //@ts-ignore
                                        .findOne({ _id: email, passwordHash: hash });
            let success = "true";
            let roleSelected = getCookie("role", { req, res })?.toString().toLowerCase();
            if (user && user.role.toLowerCase() === roleSelected) {
                setCookie("email", user._id, { req, res });
                setCookie("firstName", user.firstName, { req, res });
                setCookie("lastName", user.lastName, { req, res });
                setCookie("role", user.role, { req, res });
                setCookie("loggedIn", true, { req, res });
            } else {
                success = "false";
            }
            res.status(200).json({ success: success, user: user });
            break;
        default:
            res.status(405).json({ error: "Invalid HTTP method " });
            break;
    }
}
      