import { male, female } from "public/scoring_scale/scoring_scales";
import Soldier from "types/soldier";

/**
 * Calculates and sets the given soldier's maximum deadlift score
 * @param {Soldier} soldier - Soldier object that encapsulates data about the soldier
 * @param {Number} lbs - Maximum deadlift in pounds (lbs)
 */
function mdl(soldier: Soldier, lbs: Number): number {
    if (lbs < 0) return 0;

    let scale = soldier.gender == "Male" ? male : female;
    let ageGroup = getAgeGroup(soldier); 

    let eventKey = "deadlift" as keyof typeof scale;
    let eventScale = scale[eventKey];
    let ageKey = ageGroup.toString() as keyof typeof eventScale;
    let scoringReference = scale[eventKey][ageKey];

    let eventScore = 0;

    // Iterate through scoring scale
    for (const [rr, es] of Object.entries(scoringReference)){
        let required_result = Number(rr);
        let earned_score = Number(es);
      
        // events counted in time
        // events where you want the highest Number/time
        if (lbs >= required_result) {
            eventScore = Math.max(earned_score, eventScore);
        }
    }
    return eventScore;
}

/**
 * Calculates and sets the given soldier's standing power throw score
 * @param {Soldier} soldier - Soldier object that encapsulates data about the soldier
 * @param {Number} meters - The Number of meters recorded for the standing power throw
 */
function spt(soldier: Soldier, meters: Number): number {
    if (meters < 0) return 0;

    let scale = soldier.gender ? male : female;
    let ageGroup = getAgeGroup(soldier); 

    let eventKey = "standing_power_throw" as keyof typeof scale;
    let eventScale = scale[eventKey];
    let ageKey = ageGroup.toString() as keyof typeof eventScale;
    let scoringReference = scale[eventKey][ageKey];

    let eventScore = 0;

    // Iterate through scoring scale
    for (const [rr, es] of Object.entries(scoringReference)){
        let required_result = Number(rr);
        let earned_score = Number(es);
      
        // events counted in time
        // events where you want the highest Number/time
        if (meters >= required_result) {
            eventScore = Math.max(earned_score, eventScore);
        }
    }
    return eventScore;
}

/**
 * Calculates and sets the given soldier's push-ups score
 * @param {Soldier} soldier - Soldier object that encapsulates data about the soldier
 * @param {Number} count - The Number of push-ups recorded
 */
function hrp(soldier: Soldier, count: Number): number {
    if (count < 0) return 0;

    let scale = soldier.gender == "Male" ? male : female;
    let ageGroup = getAgeGroup(soldier); 

    let eventKey = "hand_release_push_up" as keyof typeof scale;
    let eventScale = scale[eventKey];
    let ageKey = ageGroup.toString() as keyof typeof eventScale;
    let scoringReference = scale[eventKey][ageKey];

    let eventScore = 0;

    // Iterate through scoring scale
    for (const [rr, es] of Object.entries(scoringReference)){
        let required_result = Number(rr);
        let earned_score = Number(es);
      
        // events counted in time
        // events where you want the highest Number/time
        if (count >= required_result) {
            eventScore = Math.max(earned_score, eventScore);
        }
    }
    return eventScore;
}

/**
 * Calculates and sets the given soldier's sprint, drag, and carry score
 * @param {Soldier} soldier - Soldier object that encapsulates data about the soldier
 * @param {string} time - Overall time recorded for the sprint, drag, carry (mm:ss format)
 */
function sdc(soldier: Soldier, time: Number): number {
  if (time < 0) return 0;

  let scale = soldier.gender == "Male" ? male : female;
  let ageGroup = getAgeGroup(soldier); 

  let eventKey = "sprint_drag_carry" as keyof typeof scale;
  let eventScale = scale[eventKey];
  let ageKey = ageGroup.toString() as keyof typeof eventScale;
  let scoringReference = scale[eventKey][ageKey];

  let eventScore = 0;

  // Iterate through scoring scale
  for (const [rr, es] of Object.entries(scoringReference)){
      let required_result = Number(rr.split(":")[0]) * 60 + Number(rr.split(":")[1]);
      let earned_score = Number(es);
     
      if (Number(time) <= required_result) {
        eventScore = Math.max(earned_score, eventScore);
      }
  }
  return eventScore;
}

/**
 * Calculates and set the given soldier's plank score
 * @param {Soldier} soldier - Soldier object that encapsulates data about the soldier
 * @param {string} time - Time recorded for plank test (mm:ss format)
 */
function plk(soldier: Soldier, time: number): number {
  if (time < 0) return 0;

  let scale = soldier.gender == "Male" ? male : female;
  let ageGroup = getAgeGroup(soldier); 

  let eventKey = "plank" as keyof typeof scale;
  let eventScale = scale[eventKey];
  let ageKey = ageGroup.toString() as keyof typeof eventScale;
  let scoringReference = scale[eventKey][ageKey];

  let eventScore = 0;

  // Iterate through scoring scale
  for (const [rr, es] of Object.entries(scoringReference)){
      let required_result = Number(rr.split(":")[0]) * 60 + Number(rr.split(":")[1]);
      let earned_score = Number(es);
     
      if (Number(time) >= required_result) {
        eventScore = Math.max(earned_score, eventScore);
      }
  }
  return eventScore;
}

/**
 * Calculates and sets the given soldier's two-mile run score
 * @param {Soldier} soldier - Soldier object that encapsulates data about the soldier
 * @param {string} time - Time recorded for the two-mile run (mm:ss format)
 */
function tmr(soldier: Soldier, time: number): number {
  if (time < 0) return 0;

  let scale = soldier.gender == "Male" ? male : female;
  let ageGroup = getAgeGroup(soldier); 

  let eventKey = "two_mile_run" as keyof typeof scale;
  let eventScale = scale[eventKey];
  let ageKey = ageGroup.toString() as keyof typeof eventScale;
  let scoringReference = scale[eventKey][ageKey];
  let eventScore = 0;

  // Iterate through scoring scale
  for (const [rr, es] of Object.entries(scoringReference)){
      let required_result = Number(rr.split(":")[0]) * 60 + Number(rr.split(":")[1]);
      let earned_score = Number(es);
      
      if (Number(time) <= required_result) {
        eventScore = Math.max(earned_score, eventScore);
      }
  }
  return eventScore;
}

/**
 * Checks if the given soldier passed the Army Combat Fitness Test.
 * @param soldier - The soldier whose scores to check
 * @returns True if the given soldier passed, false otherwise.
 */
function passed(soldier: Soldier): boolean {
    if (soldier.totalScore == -1) {
        throw new Error(`Soldier ${soldier.firstName} ${soldier.lastName} test scores are not all populated`)
    }
    const result = soldier;
    const props = Reflect.ownKeys(result);
    for (const prop of props) {
        let score = parseInt(Reflect.get(result, prop));
        if (score < 60) {
            return false;
        }
    };
    return true;
}

function calculateScore(soldier: Soldier) {
    let scale = soldier.gender === "Male" ? male : female;    
    let age = getAge(soldier); 

    let eventNum = 0;
    // Iterate through event results
    for (const [event, result] of Object.entries(soldier).slice(7, -1)) {
      let eventKey = event as keyof typeof scale;
      let eventScale = scale[eventKey];
      let ageKey = age.toString() as keyof typeof eventScale;

      let eventScore = 0;

      // Iterate through scoring scale
      for (const [rr, es] of Object.entries(scale[eventKey][ageKey])){
        let required_result = Number(rr);
        let earned_score = Number(es);
        
        // events counted in time
        if (eventNum >= 3) {
          required_result = Number(rr.split(":")[0]) * 60 + Number(rr.split(":")[1]);
        }

        // Events where you want the lowest time
        if (event == 'sprint_drag_carry' || event == 'two_mile_run') {
          if (result <= required_result) {
            eventScore = Math.max(earned_score, eventScore);
          }
        }else {
          // events where you want the highest Number/time
          if (result >= required_result) {
            eventScore = Math.max(earned_score, eventScore);
          }
        }
      }
      eventNum += 1
      soldier.totalScore += eventScore;
    }
    alert(soldier.totalScore);
}

/**
 * Convert a give number of seconds to a string (mm:ss format)
 * @param seconds Raw time (in seconds) to convert to a string
 * @returns String representation of the given time
 */
function timeToString(seconds: number): string {
  return `${("0" + Math.round((seconds / 60) % 60)).slice(-2)}:` +
         `${("0" + Math.round(seconds % 60)).slice(-2)}`;
}

const AGES: number[] = [17, 22, 27, 32, 37, 42, 47, 52, 57, 62]

/**
 * @param soldier The soldier whose age to return
 * @returns The age (in years) of the given soldier
 */
function getAge(soldier: Soldier): number {
  let birthday = new Date(soldier.birthday);
  let timeDiff = Date.now() - birthday.getTime();
  const TO_SEC = 1000;
  const TO_MIN = 60;
  const TO_HOUR = 60;
  const TO_DAY = 24;
  const TO_YEAR = 365;
  let age = Math.floor(timeDiff / TO_SEC / TO_MIN / TO_HOUR / TO_DAY / TO_YEAR);
  return age;
}

/**
 * Returns the age group of the given soldier for scoring purposes
 * @param soldier The soldier whose age group to return
 * @returns The age group of the given soldier
 */
function getAgeGroup(soldier: Soldier): number {
  let age = getAge(soldier);
  for (let i = 1; i < AGES.length; i++) {
    let curr = AGES[i];
    if (age < curr) {
      return AGES[i - 1];
    }
  }
  return AGES.slice(-1)[0];
}

export { mdl, spt, hrp, sdc, plk, tmr, timeToString, getAge, getAgeGroup };
