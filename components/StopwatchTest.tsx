import React, { useState, useEffect } from 'react';
import { Button, Card, createTheme, MenuItem, TextField } from '@mui/material';
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
  const [time, setTime] = useState(0);
  const [timer, setTimer] = useState<NodeJS.Timer>();
  const [render, setRender] = useState(0);
  const [started, setStarted] = useState(false);
  const [currSoldier, setCurrSoldier] = useState<Soldier>();
  const [dropdownError, setDropdownError] = useState(false);
  const [showMsg, setShowMsg] = useState(false);
  const [timeLeft, setTimeLeft] = useState(-1);
  const [visibility, setVisibility] = useState("");

  function handleClick() {
    // Use updater function when new state is derived from old
    setStarted(!started);
  };

  function handleReset() {
    setTime(0);
  }

  function handleSelect() {
    setStarted(false);
    setTime(0);
  }

  function syncData(soldier: Soldier) {
    setCurrSoldier(soldier);
  }

  function getTime() {
    setTime(time => time + 10);
  }

  let handleVisibilityChange = () => {
    // Handle stopwatch pausing when page hidden
    if (document.visibilityState === "hidden") {
      setVisibility("hidden");
    } else if (document.visibilityState === "visible") {
      setVisibility("visible");
    }
  }

  useEffect(() => {
    if (started) {
      if (visibility === "hidden") {
        let now = Date.now();
        setTimeLeft(now);
        clearInterval(timer);
      } else if (visibility === "visible") {
        let now = Date.now();
        let diff = Math.round((now - timeLeft) / 10) * 10;
        setTime(time => time + diff);
        setTimer(setInterval(getTime, 10));
      }
    }
  }, [visibility])

  useEffect(() => {
    document.addEventListener("visibilitychange", handleVisibilityChange)
    return () => document.removeEventListener("visibilitychange", handleVisibilityChange);
  }, [])

  useEffect(() => {
    if (started) {
      setTimer(setInterval(getTime, 10));
      setShowMsg(false);
    } else if (!started && render > 0) {
      fetch(`/api/soldiers/${currSoldier?._id}/${props.testName}/
        ${time / 1000}`, { method: "PATCH" }) 
        .then(res => {
          res.json().then(json => {
            console.log(json);
          })
        })     
      clearInterval(timer);
      setShowMsg(true);
    }
    setRender(render => render + 1);
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
      <div className={styles.watchContainer}>
        <div className={styles.digitsContainer}>
            <h2>
              {("0" + Math.floor((time / 60000) % 60)).slice(-2)}:
            </h2>
            <h2>
              {("0" + Math.floor((time / 1000) % 60)).slice(-2)}.
            </h2>
            <h2>
              {("0" + ((time / 10) % 100)).slice(-2)}
            </h2>
        </div>
        <div className={styles.msgContainer} style={{ visibility: showMsg ? "visible" : "hidden" }}>
          <Typography color="success">
            <i>Time submitted successfully</i>
          </Typography>
        </div>
        <div>
          <Button 
            className={styles.watchButton}
            variant="contained" 
            onClick={handleClick} 
            color={started ? "error" : "success"}>
              <Typography variant="h5">
                {started ? "Stop" : "Start"}
              </Typography>
          </Button>
          <Button 
            className={styles.watchButton}
            variant="outlined" 
            onClick={handleReset} 
            disabled={started}>
              <Typography variant="h5">
                Reset
              </Typography>
          </Button>
        </div>
      </div>
      <NavArrows 
        prevPageUrl={props.prevPageUrl} 
        nextPageUrl={props.nextPageUrl} />
    </div>
  );
}