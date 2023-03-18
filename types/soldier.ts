import { ObjectId } from "mongodb";

/*
 * Encapsulates data about a soldier
 */
export default interface Soldier {
    _id: string
    firstName: string,
    lastName: string,
    birthday: string,
    gender: string,
    mdl: number,
    spt: number,
    hrp: number,    
    sdc: number,
    plk: number,
    tmr: number,
    totalScore: number
}