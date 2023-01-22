enum Gender {
    Male,
    Female
}

/**
 * Encapsulates score results for each test
 */
interface TestResult {
    mdl?: number,
    spt?: number, 
    hrp?: number,
    sdc?: number,
    plk?: number,
    tmr?: number
};

/**
 * Encapsulates data about a soldier
 */
interface Soldier {
    firstName: string,
    lastName: string,
    age: number,
    gender: Gender,
    result?: TestResult;
}