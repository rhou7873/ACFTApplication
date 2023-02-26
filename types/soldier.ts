import { ObjectId } from "mongodb";
import Gender from "types/gender";

/**
 * Encapsulates data about a soldier
 */
export default interface Soldier {
    _id: ObjectId
    firstName: string,
    lastName: string,
    email: string,
    age: number,
    ageGroup: number,
    gender: string,
    mdl: number,
    spt: number,
    hrp: number,
    sdc: number,
    plk: number,
    tmr: number,
    score: number
}