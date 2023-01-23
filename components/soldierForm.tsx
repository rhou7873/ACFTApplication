import React, { useState } from 'react';
import { TextField, Button, MenuItem } from "@mui/material";

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
    let res = await fetch("./api/soldiers", {
        method: "POST",
        body: JSON.stringify(results),
    });
    alert(`Submitted: \n Name: ${name}\nEmail: 
    ${email}\nAge: ${age}\nMDL: ${mdl} pounds\nSPT: 
    ${spt} meters\nHRP: ${hrp} reps\nSDC: ${sdc}\nPLK: 
    ${plk}\nRun: ${run}`);
  }

  return (
    <>
      <TextField 
        label="Name" 
        variant="filled" 
        size="small" 
        margin="dense" 
        onChange={e => setName(e.target.value)}
        color="success"
        required 
      />
      <br />
      <TextField 
        label="Email" 
        variant="filled" 
        size="small" 
        margin="dense" 
        onChange={e => setEmail(e.target.value)}
        color="success"
        required 
      />
      <br />
      <TextField 
        label="Age" 
        variant="filled" 
        size="small" 
        margin="dense" 
        onChange={e => setAge(e.target.value)}
        color="success"
        required 
      />
      <br />
      <TextField 
        label="Gender"
        variant="filled" 
        size="small" 
        margin="dense" 
        onChange={e => setGender(e.target.value)}
        value={gender}
        color="success"
        select
        required 
      >
        <MenuItem value="Male">Male</MenuItem>
        <MenuItem value="Female">Female</MenuItem>
      </TextField>
      <br />
      <TextField 
        label="MDL"
        helperText="Max Deadlift (Pounds)"
        variant="filled" 
        size="small" 
        margin="dense" 
        onChange={e => setMDL(e.target.value)}
        color="success"
        required 
      />
      <br />
      <TextField 
        label="SPT"
        helperText="Standing Power Toss (Meters)"
        variant="filled" 
        size="small" 
        margin="dense" 
        onChange={e => setSPT(e.target.value)}
        color="success"
        required 
      />
      <br />
      <TextField 
        label="HRP"
        helperText="Hand Release Push-Ups (Reps)"
        variant="filled" 
        size="small" 
        margin="dense" 
        onChange={e => setHRP(e.target.value)}
        color="success"
        required 
      />
      <br />
      <TextField 
        label="SDC"
        helperText="Sprint, Drag, Carry (Duration)"
        variant="filled" 
        size="small" 
        margin="dense" 
        onChange={e => setSDC(e.target.value)}
        color="success"
        required 
      />
      <br />
      <TextField 
        label="PLK"
        helperText="Plank (Duration)"
        variant="filled" 
        size="small" 
        margin="dense" 
        onChange={e => setPLK(e.target.value)}
        color="success"
        required 
      />
      <br />
      <TextField 
        label="2MR"
        helperText="2 Meter Run (Duration)"
        variant="filled" 
        size="small" 
        margin="dense" 
        onChange={e => setRun(e.target.value)}
        color="success"
        required 
      />
      <br />
      <Button 
        variant="contained" 
        onClick={e => handleSubmit(e)}
        sx={{ marginTop: 2, backgroundColor: "#42A242" }}>
          Submit
      </Button>
    </>
  );
}

export default SoldierForm;