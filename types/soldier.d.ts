enum Gender {
    Male,
    Female
}

/**
 * Encapsulates data about a soldier
 */
interface Soldier {
    firstName: string,
    lastName: string,
    age: number,
    gender: Gender
}