import React, { useState } from "react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Button, MenuItem, TextField, Typography } from "@mui/material";
import styles from "styles/NewSoldierForm.module.css";
import { DatePicker, MobileDatePicker } from "@mui/x-date-pickers";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import dayjs from "dayjs";
import sha256 from "crypto-js/sha256";
import { useRouter } from "next/router";

interface SoldierEntry {
  _id: string,
  firstName: string,
  lastName: string,
  birthday: dayjs.Dayjs,
  gender: string,
  role: string,
  passwordHash: string
}

const ages = [17, 22, 27, 32, 37, 42, 47, 52, 57, 62]

function SoldierForm() : JSX.Element{
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [birthday, setBirthday] = useState(dayjs(new Date("1000-1-1")));
  const [birthdayError, setBirthdayError] = useState(false);
  const [gender, setGender] = useState("Male");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [pwdError, setPwdError] = useState(false);

  let router = useRouter();

  let handleSubmit = async (e: any) => {
    e.preventDefault();
    if (birthday.year() === 1000) {
      setBirthdayError(true);
      return;
    } else if (password !== confirmPassword) {
      setPwdError(true);
      return;
    }
    let results: SoldierEntry = {
      _id: email,
      firstName: firstName,
      lastName: lastName,
      birthday: birthday,
      gender: gender,
      role: "Soldier",
      passwordHash: sha256(password).toString()
    };
    await fetch("./api/soldiers", {
        method: "POST",
        body: JSON.stringify(results),
    }).then(res => {
      if (res.status == 409) {
        setEmailError(true);
      } else {
        router.push("/login")
      }
    });
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
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <MobileDatePicker 
              label="Birthday"
              slotProps={{
                textField: { required: true, error: birthdayError, size: "small" }
              }}
              slots={{ textField: TextField }}
              onChange={value => setBirthday(value as dayjs.Dayjs)}
            />
          </LocalizationProvider>
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
          <TextField 
            className={styles.inputField}
            error={emailError}
            value={email} 
            type="email"
            onChange={e => {setEmailError(false); setEmail(e.target.value)}} 
            size="small"
            name="email"
            label="Email"
            helperText={emailError ? "Email already exists" : ""}
            required />
          <TextField 
            className={styles.inputField}
            value={password} 
            type="password"
            onChange={e => {setPwdError(false); setPassword(e.target.value)}} 
            size="small"
            name="password"
            label="Password"
            error={pwdError}
            required />
          <TextField 
            className={styles.inputField}
            value={confirmPassword} 
            type="password"
            onChange={e => {setPwdError(false); setConfirmPassword(e.target.value)}} 
            size="small"
            name="confirmPassword"
            label="Confirm Password"
            error={pwdError}
            helperText={pwdError ? "Doesn't match password" : ""}
            required />
          <Button 
            className={styles.submitButton}
            size="large"
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