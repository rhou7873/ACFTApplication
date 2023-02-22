import { Button, InputAdornment, TextField, Typography } from '@mui/material'
import React, { ChangeEvent, useState } from 'react'
import styles from "styles/SliderTest.module.css";
import { useRouter } from "next/router";

interface SliderTestProps {
  title: string,
  sliderMin: number,
  sliderMax: number, 
  sliderStep: number,
  defaultValue?: string,
  unit: string,
  nextPageUrl: string
}

function SliderTest(props: SliderTestProps) {
  let [formVal, setFormVal] = useState(props.defaultValue != undefined ? props.defaultValue : "0");
  let [validInput, setValidInput] = useState(true);
  let [success, setSuccess] = useState(false);
  const router = useRouter();

  let handleClick = (e: React.MouseEvent) => {
    if (isNaN(parseFloat(formVal))) {
      setValidInput(false);
      return;
    }
    setValidInput(true);
    setSuccess(true);
    /* API call */
    router.push(props.nextPageUrl);
  }

  let helperText = validInput ? "" :
    <Typography 
      color={"red"}
      className={styles.errorText}
      fontSize={14}>
      <i>Invalid input</i>
    </Typography>

  return (
    <div className={styles.container}>
      <div>
          <Typography variant="h4">{props.title}</Typography>
      </div>
      <div className={`${styles.input}`}>
        <TextField 
          id="textField"
          // size="small"
          value={formVal}     
          onChange={e => setFormVal(e.target.value)}
          margin="none"
          className={`${styles.center} ${styles.textfield}`}
          type="number"
          InputProps={{ 
            endAdornment: <InputAdornment position="end">{props.unit}</InputAdornment>
          }}
          error={!validInput}
          helperText={helperText} />
      </div>
      <div className={styles.center}>
        <Button 
          onClick={(e: React.MouseEvent) => handleClick(e)}
          variant="contained">
            Submit
        </Button>
      </div>
    </div>
  )
}

export default SliderTest