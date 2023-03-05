import React, { useState } from "react";
import {male, female} from "public/scoring_scale/scoring_scales";
import { Button, MenuItem, TextField, Typography } from "@mui/material";
import styles from "styles/NewSoldierForm.module.css";

interface SoldierEntry {
  firstName: string,
  lastName: string,
  email: string,
  age: number,
  ageGroup: number;
  gender: string,
  mdl: number,
  spt: number,
  hrp: number,
  sdc: number,
  plk: number,
  tmr: number,
  score: number
}

const ages = [17, 22, 27, 32, 37, 42, 47, 52, 57, 62]

function getAgeGroup(results : SoldierEntry) : number {
  let age = Number(results.age);
  let i = 0
  while (age > ages[i]) {
    i += 1
  }
  return ages[i - 1];
}

function SoldierForm() : JSX.Element{
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("Male");

  let handleSubmit = async (e: any) => {
    e.preventDefault();
    let results: SoldierEntry = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      age: parseInt(age),
      ageGroup: -1,
      gender : gender,
      mdl: 0,
      spt: 0,
      hrp: 0,
      sdc: 0,
      plk: 0,
      tmr: 0,
      score: -1
    };
    results.ageGroup = getAgeGroup(results);
    await fetch("./api/soldiers", {
        method: "POST",
        body: JSON.stringify(results),
    });
    setFirstName("");
    setLastName("");
    setEmail("");
    setAge("");
  }

  return (
    <div className={styles.container}>
      <Typography variant="h3">Soldier Registration</Typography>
      <form onSubmit={handleSubmit}>
        <div className={styles.formContainer}>
          <TextField 
            className={styles.inputField}
            value={firstName} 
            onChange={e => setFirstName(e.target.value)} 
            size="small"
            name="firstName"
            label="First Name"
            required />
          <TextField 
            className={styles.inputField}
            value={lastName} 
            onChange={e => setLastName(e.target.value)} 
            size="small"
            name="lastName"
            label="Last Name"
            required />            
          <TextField 
            className={styles.inputField}
            value={email} 
            type="email"
            onChange={e => setEmail(e.target.value)} 
            size="small"
            name="email"
            label="Email"
            required />
          <TextField 
            className={styles.inputField}
            type="number" 
            value={age} 
            onChange={e => setAge(e.target.value)} 
            size="small"
            name="age"
            label="Age"
            required />
          <TextField 
            className={styles.inputField}
            value={gender} 
            onChange={e => setGender(e.target.value)} 
            size="small"
            select
            required>
            <MenuItem key="male" value="Male">Male</MenuItem>
            <MenuItem key="female" value="Female">Female</MenuItem>
          </TextField>
          <Button 
            className={styles.submitButton}
            type="submit"
            variant="contained">
            Submit
          </Button>
        </div>
      </form>
    </div>
  );
}

export default SoldierForm;