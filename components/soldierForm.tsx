import React, { useState } from 'react';
import { TextField, Button, MenuItem } from "@mui/material";

function calculate_score(results : Object){
    // calculate and set score
}

function SoldierForm(props : any) : JSX.Element{
  const [formValues, setFormValues] = useState({
    name: "",
    email: "",
    age: "",
    mdl: "",
    spt: "",
    hrp: "",
    sdc: "",
    plk: "",
    run: "",
    gender: "Male",
    score: 0
  })
  const [showConfirmation, setShowConfirmation] = useState(false);
  async function handleSubmit(event: any) {
    event.preventDefault();
    let results = formValues;
    calculate_score(results);
    let res = await fetch("./api/soldiers", {
        method: "POST",
        body: JSON.stringify(results),
    });
    console.log("here");
    setFormValues({
      name: "",
      email: "",
      age: "",
      mdl: "",
      spt: "",
      hrp: "",
      sdc: "",
      plk: "",
      run: "",
      gender: "Male",
      score: 0
    });
    setShowConfirmation(true);
  }

  return (
    <>
      <form id="SoldierForm" onSubmit={e => handleSubmit(e)}>
        <TextField 
          label="Name" 
          variant="filled" 
          size="small" 
          margin="dense" 
          onChange={e => setFormValues({...formValues, name: e.target.value})}
          color="success"
          value={formValues.name}
          required 
        />
        <br />
        <TextField 
          label="Email" 
          variant="filled" 
          size="small" 
          margin="dense" 
          onChange={e => setFormValues({...formValues, email: e.target.value})}
          color="success"
          value={formValues.email}
          required 
        />
        <br />
        <TextField 
          label="Age" 
          variant="filled" 
          size="small" 
          margin="dense" 
          onChange={e => setFormValues({...formValues, age: e.target.value})}
          color="success"
          value={formValues.age}
          required 
        />
        <br />
        <TextField 
          label="Gender"
          variant="filled" 
          size="small" 
          margin="dense" 
          onChange={e => setFormValues({...formValues, gender: e.target.value})}
          value={formValues.gender}
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
          onChange={e => setFormValues({...formValues, mdl: e.target.value})}
          color="success"
          value={formValues.mdl}
          required 
        />
        <br />
        <TextField 
          label="SPT"
          helperText="Standing Power Toss (Meters)"
          variant="filled" 
          size="small" 
          margin="dense" 
          onChange={e => setFormValues({...formValues, spt: e.target.value})}
          color="success"
          value={formValues.spt}
          required 
        />
        <br />
        <TextField 
          label="HRP"
          helperText="Hand Release Push-Ups (Reps)"
          variant="filled" 
          size="small" 
          margin="dense" 
          onChange={e => setFormValues({...formValues, hrp: e.target.value})}
          color="success"
          value={formValues.hrp}
          required 
        />
        <br />
        <TextField 
          label="SDC"
          helperText="Sprint, Drag, Carry (Duration)"
          variant="filled" 
          size="small" 
          margin="dense" 
          onChange={e => setFormValues({...formValues, sdc: e.target.value})}
          color="success"
          value={formValues.sdc}
          required 
        />
        <br />
        <TextField 
          label="PLK"
          helperText="Plank (Duration)"
          variant="filled" 
          size="small" 
          margin="dense" 
          onChange={e => setFormValues({...formValues, plk: e.target.value})}
          color="success"
          value={formValues.plk}
          required 
        />
        <br />
        <TextField 
          label="2MR"
          helperText="2 Meter Run (Duration)"
          variant="filled" 
          size="small" 
          margin="dense" 
          onChange={e => setFormValues({...formValues, run: e.target.value})}
          color="success"
          value={formValues.run}
          required 
        />
        <br />
        <Button 
          variant="contained" 
          sx={{ marginTop: 2, backgroundColor: "#42A242" }}
          type="submit">
            Submit
        </Button>
      </form>
      {showConfirmation ? <p id="confirmation" style={{ "color": "green" }}>Soldier data entered</p> : null}
    </>
  );
}

export default SoldierForm;