import { ObjectId } from "mongodb";
import { useState, useEffect } from "react";
import NavBar from "../components/navBar";
import { Table, TableContainer, TableHead, 
         TableBody, TableCell, TableRow, Typography } from "@mui/material";
import { CSSProperties } from "@mui/styled-engine";

interface ScoreScale {
    _id: ObjectId,
    testName: string,
    testAbbreviation: string,
    scores: object,
    lastUpdated: Date
}

export default function ScoringScale() {
    const [scoring, setScoring] = useState<ScoreScale[]>([]);

    useEffect(() => {
        fetch("./api/scoring-scale", { method: "GET" })
            .then(res => res.json())
            .then(json => {
                setScoring(json);
            });
    }, []);

    let maleFemale: any[] = [];
    for (let i = 0; i < 10; i++) {
        maleFemale.push(
            <>
                <TableCell align="center">M</TableCell>
                <TableCell align="center">F</TableCell>
            </>
        )
    }

    return (
        <div>
            <NavBar />
            {scoring.map(scale => {
                return (
                    <TableContainer>
                        <Table size="small">
                            <TableHead>
                                <TableRow>
                                    <TableCell align="center" colSpan={22}>
                                        <h1>{scale.testName} ({scale.testAbbreviation.toUpperCase()})</h1>
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell />
                                    <TableCell align="center" colSpan={2}>
                                        <b>17-21</b>
                                    </TableCell>
                                    <TableCell align="center" colSpan={2}>
                                        <b>22-26</b> 
                                    </TableCell>
                                    <TableCell align="center" colSpan={2}>
                                        <b>27-31</b>
                                    </TableCell>
                                    <TableCell align="center" colSpan={2}>
                                        <b>32-36</b>
                                    </TableCell>
                                    <TableCell align="center" colSpan={2}>
                                        <b>37-41</b>
                                    </TableCell>
                                    <TableCell align="center" colSpan={2}>
                                        <b>42-46</b>
                                    </TableCell>
                                    <TableCell align="center" colSpan={2}>
                                        <b>47-51</b>
                                    </TableCell>
                                    <TableCell align="center" colSpan={2}>
                                        <b>52-56</b>
                                    </TableCell>
                                    <TableCell align="center" colSpan={2}>
                                        <b>57-61</b>
                                    </TableCell>
                                    <TableCell align="center" colSpan={2}>
                                        <b>Over 62</b>
                                    </TableCell>
                                    <TableCell />
                                </TableRow>
                                <TableRow>
                                    <TableCell align="center">Points</TableCell>
                                    {maleFemale}
                                    <TableCell align="center">Points</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                
                            </TableBody>
                        </Table>
                        <br />
                        <br />
                        <br />
                    </TableContainer>
                )
            })}
        </div>
    );
}