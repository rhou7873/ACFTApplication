import React, { useState, useEffect } from 'react';
import { Button } from '@mui/material';
import { Typography } from '@mui/material'
import styles from "styles/StopwatchTest.module.css"

interface StopwatchTestProps {
  threshold: number,
  title: string,
  nextPage: string
}

export default function StopwatchTest(props : any) {
  const [color, setColor] : any = useState('error');
  const [time, setTime] = useState(0);
  const [started, setStarted] = useState(false);

  function handleClick() {
    // Use updater function when new state is derived from old
    setStarted(!started);
    if(time >= (props.threshold) * 1000){
        setColor('success');
    }
  };

  function getTime(){
    setTime((time) => time + 100);
  }

  useEffect(() => {
    let interval : any = null;
    if (started) {
      interval = setInterval(() => getTime(), 100);
    } else if (interval && !started) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [started]);

  return (
    <div>
      <div>
          <Typography variant="h4">{props.title}</Typography>
      </div>
      <Button style={{ width: "100px", height: "100px", fontSize : "30px"}} variant="contained" onClick={handleClick} color={color}>{time / 1000}</Button>
    </div>
  );
}