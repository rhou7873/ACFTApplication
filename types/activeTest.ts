import { ObjectId } from "mongodb";
import Grader from "types/grader";
import Soldier from "types/soldier";

/* Encapsulates data about a currently active ACFT */
export default interface ActiveTest {
    _id: ObjectId,
    location: string,
    soldiers: Soldier[],
    graders: Grader[],
    soldierGrader: Map<Soldier, Grader>,
    graderSoldiers: Map<Grader, Soldier[]>
}