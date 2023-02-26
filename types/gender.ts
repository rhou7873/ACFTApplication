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
export const STR_GENDER_MAP: Map<string, Gender> = new Map<string, Gender>();
STR_GENDER_MAP.set("Male", Gender.Male);
STR_GENDER_MAP.set("Female", Gender.Female);

export const ENUM_GENDER_MAP: Map<Gender, string> = new Map<Gender, string>();
ENUM_GENDER_MAP.set(Gender.Male, "Male");
ENUM_GENDER_MAP.set(Gender.Female, "Female");

export default Gender;