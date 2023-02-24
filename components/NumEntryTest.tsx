import { Button, InputAdornment, TextField, Typography } from '@mui/material'
import React, { ChangeEvent, useState } from 'react'
import styles from "styles/NumEntry.module.css";
import { useRouter } from "next/router";
import NavArrows from "./NavArrows";

interface NumEntryProps {
  title: string,
  sliderMin: number,
  sliderMax: number, 
  sliderStep: number,
  defaultValue?: string,
  unit: string,
  nextPageUrl?: string,
  prevPageUrl?: string
}

function SliderTest(props: NumEntryProps) {
  let [formVal, setFormVal] = useState(props.defaultValue != undefined ? props.defaultValue : "");
  let [validInput, setValidInput] = useState(true);
  let [success, setSuccess] = useState(false);

  let handleSubmit = (e: React.MouseEvent) => {
    if (isNaN(parseFloat(formVal))) {
      setValidInput(false);
      return;
    }
    setValidInput(true);
    /* API call */
    setSuccess(true);
  }

  let getHelperText = () => {
    if (!validInput) {
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
          error={!validInput}
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

export default SliderTest