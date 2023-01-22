/**
 * Enum that encapsulates gender choices for ACFT
 */
enum Gender {
    Male,
    Female
}

/**
 * Maps the gender strings to enum value
 */
const STR_GENDER_MAP =  {
    "Male": Gender.Male,
    "Female": Gender.Female
}

/**
 * Maps the gender enum values to strings
 */
const ENUM_GENDER_MAP = {
    [Gender.Male]: "Male",
    [Gender.Female]: "Female"
}