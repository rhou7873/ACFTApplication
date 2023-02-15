import { Button, ButtonGroup, Slider, TextField, Typography } from '@mui/material'
import React, { ChangeEvent, useState } from 'react'
import styles from "../styles/SliderTest.module.css";

interface SliderTestProps {
  title: string,
  sliderMin: number,
  sliderMax: number, 
  sliderStep: number,
  defaultValue?: number,
}

enum Mode {
  Slider,
  Manual
}

function SliderTest(props: SliderTestProps) {
  let [sliderValue, setSliderValue] = useState(props.defaultValue != undefined ? props.defaultValue : 0);
  let [mode, setMode] = useState(Mode.Slider);

  return (
    <div className={styles.container}>
      <div>
          <Typography variant="h3"><b>{props.title}</b></Typography>
      </div>
      <div className={`${styles.center} ${styles.input}`}>
        {mode == Mode.Slider ?
          <Slider 
            sx={{ width: "50%" }}
            value={sliderValue}
            min={props.sliderMin}
            max={props.sliderMax}
            step={props.sliderStep}
            valueLabelDisplay="auto"
            onChange={(e, value, activeThumb) => setSliderValue(value as number)}
          /> :
          <TextField 
            size="small"
            value={sliderValue}
            onChange={e => setSliderValue(parseInt(e.target.value))}
            margin="none"
            className={`${styles.center} ${styles.textfield}`}
          />
        }
      </div>
      <div className={styles.center}>
        <ButtonGroup variant="contained">
          <Button 
            onClick={() => setMode(Mode.Slider)}
            className={`${styles.mode} ${mode != Mode.Slider ? styles.unselected : ""}`}>
              Slider
          </Button>
          <Button 
            onClick={() => setMode(Mode.Manual)}
            className={`${styles.mode} ${mode != Mode.Manual ? styles.unselected : ""}`}>
              Manual
          </Button>
        </ButtonGroup>
      </div>
    </div>
  )
}

export default SliderTest