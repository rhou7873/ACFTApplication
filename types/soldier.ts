import User from "./user"

/*
 * Encapsulates data about a soldier
 */
export default interface Soldier extends User {
    mdl: number,
    spt: number,
    hrp: number,    
    sdc: number,
    plk: number,
    tmr: number,
    totalScore: number
}