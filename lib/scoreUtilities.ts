import { male, female } from "public/scoring_scale/scoring_scales";
import Soldier from "types/soldier";

/**
 * Calculates and sets the given soldier's maximum deadlift score
 * @param {Soldier} soldier - Soldier object that encapsulates data about the soldier
 * @param {Number} lbs - Maximum deadlift in pounds (lbs)
 */
function mdl(soldier: Soldier, lbs: Number): number {
    let scale = soldier.gender == "Male" ? male : female;
    let ageGroup = soldier.ageGroup; 

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
    let scale = soldier.gender ? male : female;
    let ageGroup = soldier.ageGroup; 

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
    let scale = soldier.gender == "Male" ? male : female;
    let ageGroup = soldier.ageGroup; 

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
  let scale = soldier.gender == "Male" ? male : female;
  let ageGroup = soldier.ageGroup; 

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
  let scale = soldier.gender == "Male" ? male : female;
  let ageGroup = soldier.ageGroup; 

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
  let scale = soldier.gender == "Male" ? male : female;
  let ageGroup = soldier.ageGroup; 

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
    if (soldier.score == -1) {
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
    let scale = soldier.gender === "Male" ? male : female;    let age = soldier.age; 

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
      soldier.score += eventScore;
    }
    alert(soldier.score);
}

export { mdl, spt, hrp, sdc, plk, tmr };
