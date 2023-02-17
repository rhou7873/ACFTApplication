import React, { useState } from 'react';
import {male, female} from '../public/scoring_scale/scoring_scales';

interface results_obj {
  name : string,
  email : string,
  age : string,
  gender : string,
  deadlift : number,
  standing_power_throw : number,
  hand_release_push_up : number,
  sprint_drag_carry : number,
  plank : number,
  two_mile_run : number,
  score : number
}

let ages = [17, 22, 27, 32, 37, 42, 47, 52, 57, 62]

function getAgeGroup(results : results_obj) : number {
  let age = Number(results.age);
  let i = 0
  while (age > ages[i]) {
    i += 1
  }
  return ages[i - 1];
}


function calculateScore(results : results_obj) {
    console.log(results.gender);
    let scale = results.gender === 'Male' ? male : female;
    let age = getAgeGroup(results); 
    console.log(age);

    let eventNum = 0;
    // Iterate through event results
    for (const [event, result] of Object.entries(results).slice(4, -1)) {
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
          // events where you want the highest number/time
          if (result >= required_result) {
            eventScore = Math.max(earned_score, eventScore);
          }
        }
      }
      eventNum += 1
      results.score += eventScore;
    }
    alert(results.score);
}


function SoldierForm(props : any) : JSX.Element{
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [age, setAge] = useState('');
  const [mdl, setMDL] = useState('');
  const [spt, setSPT] = useState('');
  const [hrp, setHRP] = useState('');
  const [sdc, setSDC] = useState('');
  const [plk, setPLK] = useState('');
  const [run, setRun] = useState('');
  const [gender, setGender] = useState('Male');

  async function handleSubmit(event: any) {
    event.preventDefault();
    let results = {
        name: name,
        email: email,
        age: age,
        gender : gender,
        deadlift: Number(mdl),
        standing_power_throw: Number(spt),
        hand_release_push_up: Number(hrp),
        sprint_drag_carry: (Number(sdc.split(':')[0]) * 60 + Number(sdc.split(':')[1])),
        plank: (Number(plk.split(':')[0]) * 60 + Number(plk.split(':')[1])),
        two_mile_run : (Number(run.split(':')[0]) * 60 + Number(run.split(':')[1])),
        score: 0
    };
    alert(JSON.stringify(results));
    
    await calculateScore(results);
    let res = await fetch("./api/testApi", {
        method: "POST",
        body: JSON.stringify(results),
    });
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Name:
        <input type="text" value={name} onChange={e => setName(e.target.value)} required />
      </label>
      <br />
      <label>
        Email:
        <input type="email" value={email} onChange={e => setEmail(e.target.value)} required />
      </label>
      <br />
      <label>
        Age:
        <input type="number" value={age} onChange={e => setAge(e.target.value)} required />
      </label>
      <br />
      <label>
        Gender:
        <select value={gender} onChange={e => setGender(e.target.value)} required>
            <option>Male</option>
            <option>Female</option>
        </select>
      </label>
      <br />
      <label>
        Maximum Deadlift (MDL) in pounds:
        <input type="number" value={mdl} onChange={e => setMDL(e.target.value)} required />
      </label>
      <br />
      <label>
        Standing Power Toss (SPT) in meters:
        <input type="number" value={spt} onChange={e => setSPT(e.target.value)} required />
      </label>
      <br />
      <label>
        Hand Release Push-ups (HRP) as reps:
        <input type="number" value={hrp} onChange={e => setHRP(e.target.value)} required />
      </label>
      <br />
      <label>
        Sprint Drag Carry (SDC) as duration (mm:ss):
        <input type="text" value={sdc} pattern="[0-9]{2}:[0-9]{2}" onChange={e => setSDC(e.target.value)} placeholder='00:00' required />
      </label>
      <br />
      <label>
        Plank (PLK) as duration (mm:ss):
        <input type="text" value={plk} pattern="[0-9]{2}:[0-9]{2}" onChange={e => setPLK(e.target.value)} placeholder='00:00' required />
      </label>
      <br />
      <label>
        2 meter run as duration (mm:ss)
        <input type="text" value={run} pattern="[0-9]{2}:[0-9]{2}" onChange={e => setRun(e.target.value)} placeholder='00:00' required />
      </label>
      <br />
      <button type="submit">Submit</button>
    </form>
  );
}

export default SoldierForm;