import React, { useState } from 'react';

function calculate_score(results : Object){
    // calculate and set score
}


function SoldierForm(props : any) : JSX.Element{
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState("");
  const [mdl, setMDL] = useState("");
  const [spt, setSPT] = useState("");
  const [hrp, setHRP] = useState("");
  const [sdc, setSDC] = useState("");
  const [plk, setPLK] = useState("");
  const [run, setRun] = useState("");
  const [gender, setGender] = useState("Male");

  async function handleSubmit(event: any) {
    event.preventDefault();
    let results = {
        name: name,
        email: email,
        age: age,
        gender : gender,
        mdl: mdl,
        spt: spt,
        hrp: hrp,
        sdc: sdc,
        plk: plk,
        run: run,
        score: 0
    };
    calculate_score(results);
    let res = await fetch("./api/soldier", {
        method: "POST",
        body: JSON.stringify(results),
    });
    alert(`Submitted: \n Name: ${name}\nEmail: 
    ${email}\nAge: ${age}\nMDL: ${mdl} pounds\nSPT: 
    ${spt} meters\nHRP: ${hrp} reps\nSDC: ${sdc}\nPLK: 
    ${plk}\nRun: ${run}`);
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