import { Button, InputAdornment, MenuItem, TextField, Typography } from '@mui/material'
import React, { useEffect, useRef, useState } from 'react'
import styles from "styles/NumEntry.module.css";
import ActiveTest from "types/activeTest";
import Soldier from "types/soldier";
import Grader from "types/grader";
import NavArrows from "./NavArrows";
import SoldierDropdown from "./SoldierDropdown";

interface NumEntryProps {
  // test: ActiveTest,
  // grader: Grader,
  title: string,
  testName: string,
  defaultValue?: string,
  unit: string,
  nextPageUrl: string,
  prevPageUrl: string
}

function invalidValue(input: string) {
  let numInput = parseFloat(input);
  return isNaN(numInput) || numInput < 0;
}

function NumEntryTest(props: NumEntryProps) {
  const [formVal, setFormVal] = useState(props.defaultValue != undefined ? props.defaultValue : "");
  const [dropdownError, setDropdownError] = useState(false);
  const [textInputError, setTextInputError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [currSoldier, setCurrSoldier] = useState<Soldier>();
  
  let handleSubmit = (e: React.MouseEvent) => {
    if (currSoldier == undefined) {
      setDropdownError(true);
      return;
    } else if (invalidValue(formVal)) {
      setTextInputError(true);
      return;
    }
    setTextInputError(false);
    fetch(`../api/soldiers/${currSoldier._id}/${props.testName}/${formVal}`,
          { method: "PATCH" })
      .then(res => {
        res.json()
          .then(json => {
            console.log(json);
          })
        if (res.ok) {
          setSuccess(true);
          setFormVal("");
        }
      })
  }

  function syncData(soldier: Soldier) {
    setCurrSoldier(soldier);
  }

  let handleSelect = () => {
    setSuccess(false);
    setFormVal("");
  }

  let getHelperText = () => {
    if (textInputError) {
      return (
        <Typography 
          color={"red"}
          className={styles.errorMsg}
          fontSize={14}>
          <i>Invalid input</i>
        </Typography>
      )
    } else if (success) {
      return (
        <Typography 
          color={"green"}
          className={styles.successMsg}
          fontSize={14}>
          <i>Results submitted successfully</i>
        </Typography>
      )
    }
    return <></>
  }

  return (
    <div className={styles.container}>
      <SoldierDropdown
        onChange={handleSelect} 
        syncData={syncData}
        testName={props.testName}
        error={dropdownError} />    
      <div className={styles.testTitle}>
          <Typography variant="h4">{props.title}</Typography>
      </div>
      <div className={`${styles.input}`}>
        <TextField 
          id="textField"
          value={formVal}     
          onChange={e => setFormVal(e.target.value)}
          margin="none"
          className={`${styles.center} ${styles.textfield}`}
          type="number"
          InputProps={{ 
            endAdornment: <InputAdornment position="end">{props.unit}</InputAdornment>
          }}
          error={textInputError}
          helperText={getHelperText()} />
      </div>
      <div className={styles.center}>
        <Button
          className={styles.submitButton}
          size="large"
          onClick={(e: React.MouseEvent) => handleSubmit(e)}
          variant="contained">
            Submit
        </Button>
      </div>
      {/* <div className={styles.guidelinesContainer}>
          
      </div> */}
      <NavArrows
        prevPageUrl={props.prevPageUrl}
        nextPageUrl={props.nextPageUrl} />
    </div>
  )
}

export default NumEntryTest