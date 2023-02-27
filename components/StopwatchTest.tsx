import React, { useState, useEffect } from 'react';
import { Button, MenuItem, TextField } from '@mui/material';
import { Typography } from '@mui/material'
import styles from "styles/StopwatchTest.module.css"
import Soldier from "types/soldier";
import NavArrows from "./NavArrows";
import ActiveTest from "types/activeTest";
import Grader from "types/grader";
import { ObjectId } from "mongodb";

interface StopwatchTestProps {
  soldiers: Soldier[],
  threshold: number,
  title: string,
  prevPageUrl: string,
  nextPageUrl: string
}

export default function StopwatchTest(props : StopwatchTestProps) {
  const [color, setColor] : any = useState('error');
  const [time, setTime] = useState(0);
  const [started, setStarted] = useState(false);
  const [soldiers, setSoldiers] = useState([] as Soldier[]);
  const [currSoldier, setCurrSoldier] = useState("");

  // const soldiers: Soldier[] = props.test.graderSoldiers.get(props.grader) as Soldier[];
  useEffect(() => {
    let controller = new AbortController();
    fetch("../api/soldiers", { method: "GET", signal: controller.signal })
        .then(res => {
            res.json().then(json => {
                setSoldiers(json);
            })
        })
    return () => { console.log("abort"); controller.abort();}
  }, []);

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
      <TextField
        onChange={e => setCurrSoldier(e.target.value)}
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
      <div>
          <Typography variant="h4">{props.title}</Typography>
      </div>
      <Button style={{ width: "100px", height: "100px", fontSize : "30px"}} variant="contained" onClick={handleClick} color={color}>{time / 1000}</Button>
      <NavArrows 
        prevPageUrl={props.prevPageUrl} 
        nextPageUrl={props.nextPageUrl} />
    </div>
  );
}