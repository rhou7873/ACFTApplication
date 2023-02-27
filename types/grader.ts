import { ObjectId } from "mongodb"

/* Encapsulates data for an ACFT grader */
export default interface Grader {
    _id: ObjectId,
    firstName: string,
    lastName: string
}