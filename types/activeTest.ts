import Grader from "types/grader";
import Soldier from "types/soldier";

/* Encapsulates data about a currently active ACFT */
export default interface ActiveTest {
    location: string,
    soldiers: Soldier[],
    graders: Map<Soldier, Grader>,
}