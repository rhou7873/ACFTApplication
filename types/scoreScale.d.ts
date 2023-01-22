/**
 * Encapsulates data about a scoring scale
 */
interface ScoreScale {
    firstName: string,
    lastName: string,
    age: number,
    gender: Gender,
    result?: TestResult;
}