import { Button, ButtonGroup, InputAdornment, Slider, TextField, Typography } from '@mui/material'
import React, { ChangeEvent, useState } from 'react'
import styles from "styles/SliderTest.module.css";

interface SliderTestProps {
  title: string,
  sliderMin: number,
  sliderMax: number, 
  sliderStep: number,
  defaultValue?: string,
  unit: string
}

enum Mode {
  Slider,
  Manual
}

function SliderTest(props: SliderTestProps) {
  let [sliderValue, setSliderValue] = useState(props.defaultValue != undefined ? props.defaultValue : "0");
  let [mode, setMode] = useState(Mode.Slider);
  return (
    <div className={styles.container}>
      <div>
          <Typography variant="h4"><b>{props.title}</b></Typography>
      </div>
      <div className={`${styles.center} ${styles.input}`}>
        {mode == Mode.Slider ?
          <>
            <Slider 
              sx={{ width: "85%" }}
              value={isNaN(parseInt(sliderValue)) ? 0 : parseInt(sliderValue)}
              min={props.sliderMin}
              max={props.sliderMax}
              step={props.sliderStep}
              valueLabelDisplay="on"
              valueLabelFormat={value => `${value} ${props.unit}`}
              onChange={(e, value, activeThumb) => setSliderValue(`${value}`)}
            /> 
          </>
          :
          <TextField 
            size="small"
            value={sliderValue}
            onChange={e => setSliderValue(e.target.value)}
            margin="none"
            className={`${styles.center} ${styles.textfield}`}
            type="number"
            InputProps={{ 
              endAdornment: <InputAdornment position="end">{props.unit}</InputAdornment> 
            }}
          />
        }
      </div>
      <div className={styles.center}>
        <ButtonGroup variant="contained">
          <Button 
            onClick={() => setMode(Mode.Slider)}
            className={mode != Mode.Slider ? styles.unselected : ""}>
              Slider
          </Button>
          <Button 
            onClick={() => setMode(Mode.Manual)}
            className={mode != Mode.Manual ? styles.unselected : ""}>
              Manual
          </Button>
        </ButtonGroup>
      </div>
    </div>
  )
}

export default SliderTest