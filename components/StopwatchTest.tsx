import React, { useState, useEffect } from 'react';
import { Button, MenuItem, TextField } from '@mui/material';
import { Typography } from '@mui/material'
import styles from "styles/StopwatchTest.module.css"
import Soldier from "types/soldier";
import NavArrows from "./NavArrows";
import ActiveTest from "types/activeTest";
import Grader from "types/grader";
import { ObjectId } from "mongodb";
import SoldierDropdown from "./SoldierDropdown";

interface StopwatchTestProps {
  title: string,
  testName: string,
  threshold: number,
  prevPageUrl: string,
  nextPageUrl: string
}

export default function StopwatchTest(props : StopwatchTestProps) {
  const [color, setColor] : any = useState('error');
  const [time, setTime] = useState(0);
  const [started, setStarted] = useState(false);
  const [currSoldier, setCurrSoldier] = useState<Soldier>();
  const [dropdownError, setDropdownError] = useState(false);

  function handleClick() {
    // Use updater function when new state is derived from old
    setStarted(!started);
    if(time >= (props.threshold) * 1000){
        setColor('success');
    }
  };

  function handleSelect() {
    setTime(0);
  }

  function syncData(soldier: Soldier) {
    setCurrSoldier(soldier);
  }

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
      <SoldierDropdown 
        onChange={handleSelect} 
        syncData={syncData}
        testName={props.testName}
        error={dropdownError} />
      <div>
          <Typography variant="h4">{props.title}</Typography>
      </div>
      <Button 
        style={{ width: "100px", height: "100px", fontSize : "30px"}} 
        variant="contained" 
        onClick={handleClick} 
        color={color}>
          {time / 1000}
      </Button>
      <NavArrows 
        prevPageUrl={props.prevPageUrl} 
        nextPageUrl={props.nextPageUrl} />
    </div>
  );
}