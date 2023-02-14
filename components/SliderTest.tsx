import { Button, ButtonGroup, Slider, TextField, Typography } from '@mui/material'
import React, { ChangeEvent, useState } from 'react'

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
  let [textValue, setTextValue] = useState(0);
  let [mode, setMode] = useState(Mode.Slider);

  let selectedStyle = {
    backgroundColor: "transparent",
    color: "black"
  }

  return (
    <div>
        <Typography variant="h3"><b>{props.title}</b></Typography>
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
          />
        }
        <br />
        <ButtonGroup variant="contained">
          <Button 
            onClick={() => setMode(Mode.Slider)}
            style={mode != Mode.Slider ? selectedStyle : undefined}>
              Slider
        </Button>
          <Button 
            onClick={() => setMode(Mode.Manual)}
            style={mode != Mode.Manual ? selectedStyle : undefined}>
              Manual
          </Button>
        </ButtonGroup>
    </div>
  )
}

export default SliderTest