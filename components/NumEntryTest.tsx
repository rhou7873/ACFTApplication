import { Button, InputAdornment, MenuItem, TextField, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import styles from "styles/NumEntry.module.css";
import ActiveTest from "types/activeTest";
import Soldier from "types/soldier";
import Grader from "types/grader";
import NavArrows from "./NavArrows";

interface NumEntryProps {
  // test: ActiveTest,
  // grader: Grader,
  title: string,
  testName: string,
  sliderMin: number,
  sliderMax: number, 
  sliderStep: number,
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
  let [formVal, setFormVal] = useState(props.defaultValue != undefined ? props.defaultValue : "");
  let [dropdownVal, setDropdownVal] = useState("");
  let [dropdownError, setDropdownError] = useState(false);
  let [textInputError, setTextInputError] = useState(false);
  let [success, setSuccess] = useState(false);
  let [currSoldier, setCurrSoldier] = useState<Soldier>();
  let [soldiers, setSoldiers] = useState([] as Soldier[]);
  
  // let soldiers: Soldier[] = props.test.graderSoldiers.get(props.grader) as Soldier[];
  
  // Gets soldiers associated with this grader
  useEffect(() => {
    fetch("../api/soldiers", { method: "GET" })
    .then(res => {
      res.json()
        .then(json => {
          setSoldiers(json);
        })
    })
  }, []);

  useEffect(() => {
    if (soldiers.length > 0) {
      if (props.testName !== "mdl") {
        soldiers.sort((a, b) => a.mdl - b.mdl);
      }
      setCurrSoldier(soldiers[soldiers.length - 1]);
      console.log(soldiers);
    }
  }, [soldiers])

  useEffect(() => {
    if (currSoldier != undefined) {
      setDropdownVal(currSoldier._id.toString());
    }
  }, [currSoldier])

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

  let handleSelect = (e: any) => {
    setDropdownError(false);
    setSuccess(false);
    setFormVal("");
    soldiers.forEach(soldier => {
      if (soldier._id.toString() === e.target.value) {
        setCurrSoldier(soldier);
      }
    })
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
      <TextField
        defaultValue=""
        value={dropdownVal}
        onChange={e => handleSelect(e)}
        error={dropdownError}
        variant="outlined"
        select>
          {soldiers.map(soldier => {
            return (
              <MenuItem 
                key={soldier._id.toString()}
                value={soldier._id.toString()}>
                  {soldier.firstName} {soldier.lastName}
              </MenuItem>
            )
          })} 
      </TextField>      
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
          onClick={(e: React.MouseEvent) => handleSubmit(e)}
          variant="contained">
            Submit
        </Button>
      </div>
      <div className={styles.guidelinesContainer}>
          
      </div>
      <NavArrows
        prevPageUrl={props.prevPageUrl}
        nextPageUrl={props.nextPageUrl} />
    </div>
  )
}

export default NumEntryTest