import { Card, CardContent, CircularProgress, Table, TableBody, TableCell, TableHead, TableRow, Typography } from "@mui/material";
import { getCookie } from "cookies-next";
import { hrp, mdl, plk, sdc, spt, tmr } from "lib/scoreUtilities";
import React, { useEffect, useState } from "react";
import styles from "styles/ActiveTest.module.css";
import Soldier from "types/soldier";

interface LiveResult {
  user_id: string,
  mdl: string,
  spt: string,
  hrp: string,
  sdc: string,
  plk: string,
  tmr: string,
  totalScore: number
}

function ActiveTest() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(true);
  const [isTakingTest, setIsTakingTest] = useState(false);
  const [testId, setTestId] = useState(-1);
  const [liveResult, setLiveResult] = useState<LiveResult>();

  useEffect(() => {
    setEmail(getCookie("email") as string);
  }, [])

  useEffect(() => {
    if (email.length > 0) {
      fetch(`/api/users/dylan.mcguire00@utexas.edu`)
      .then(res => {
        res.json().then(json => {
          setIsTakingTest(json.user.active_acft);
          if (json.user.active_acft) {
            setTestId(json.user.acft_id);
          }
          setLoading(false);
        })
      })
    }
  }, [email])
  
  useEffect(() => {
    fetch(`/api/acfts/testResults/${testId}`)
      .then(res => {
        res.json().then(json => {
          json.forEach((e: LiveResult) => {
            if (e.user_id === email) {
              setLiveResult(e);
            }
          })
        })
      })
  }, [testId])

  let soldier: Soldier = {
    _id: email,
    mdl: !liveResult ? -1 : parseInt(liveResult.mdl),
    spt: !liveResult ? -1 : parseInt(liveResult.spt),
    hrp: !liveResult ? -1 : parseInt(liveResult.hrp),
    sdc: !liveResult ? -1 : parseInt(liveResult.sdc),
    plk: !liveResult ? -1 : parseInt(liveResult.plk),
    tmr: !liveResult ? -1 : parseInt(liveResult.tmr),
    totalScore: !liveResult ? -1 : liveResult.totalScore,
    firstName: "",
    lastName: "",
    birthday: "1/1/1000",
    gender: ""
  };

  return (
    <>
      <div className={styles.container}>
        {loading ? <CircularProgress disableShrink variant="indeterminate" /> : <></>}
      </div>
      {!loading && isTakingTest && 
        <Card>
          <CardContent>
            <Typography variant="h3">Live Scorecard</Typography>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell><Typography variant="h6">Test Name</Typography></TableCell>
                  <TableCell><Typography variant="h6">Result</Typography></TableCell>
                  <TableCell><Typography variant="h6">Score</Typography></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell>Max Deadlift</TableCell>
                  <TableCell>{soldier.mdl == -1 ? 0 : soldier.mdl}</TableCell>
                  <TableCell>{mdl(soldier, soldier.mdl)}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Standing Power Throw</TableCell>
                  <TableCell>{soldier.spt == -1 ? 0 : soldier.spt}</TableCell>
                  <TableCell>{spt(soldier, soldier.spt)}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Hand Release Push-Ups</TableCell>
                  <TableCell>{soldier.hrp == -1 ? 0 : soldier.hrp}</TableCell>
                  <TableCell>{hrp(soldier, soldier.hrp)}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Sprint, Drag, Carry</TableCell>
                  <TableCell>{soldier.sdc == -1 ? 0 : soldier.sdc}</TableCell>
                  <TableCell>{sdc(soldier, soldier.sdc)}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Plank</TableCell>
                  <TableCell>{soldier.plk == -1 ? 0 : soldier.plk}</TableCell>
                  <TableCell>{plk(soldier, soldier.plk)}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Two-Mile Run</TableCell>
                  <TableCell>{soldier.tmr == -1 ? 0 : soldier.tmr}</TableCell>
                  <TableCell>{tmr(soldier, soldier.tmr)}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
            <Typography variant="h6">Total: {soldier.totalScore == -1 ? 0 : soldier.totalScore}</Typography>
          </CardContent>
        </Card>
      }
      {!loading && !isTakingTest &&
        <Typography>No active test</Typography>
      }
    </>
  )
}

export default ActiveTest