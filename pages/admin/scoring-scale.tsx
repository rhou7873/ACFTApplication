import { ObjectId } from "mongodb";
import { useState, useEffect } from "react";
import { Table, TableContainer, TableHead, 
         TableBody, TableCell, TableRow, Typography, CircularProgress } from "@mui/material";
import styles from "styles/ScoringScale.module.css";

interface ScoreScale {
    _id: ObjectId,
    testName: string,
    testAbbreviation: string,
    lastUpdated: Date
    fscores: object,
    mscores: object
}

export default function ScoringScale() {
    const [tests, setTests] = useState<ScoreScale[]>([]);
    const [scoreTables, setScoreTables] = useState<JSX.Element[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch("../api/scoring-scale", { method: "GET" })
            .then(res => res.json())
            .then(json => {
                setTests(json);
            });
    }, []);

    useEffect(() => {
        setScoreTables(
            tests.map(scale => {
                return (
                    <TableContainer sx={{ marginBottom: 5 }}>
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
                                {scoreData(scale).map(row => {
                                    return row;
                                })}
                            </TableBody>
                        </Table>
                    </TableContainer>
                )
            })
        )
    }, [tests])

    useEffect(() => {
        if (scoreTables.length > 0) {
            setLoading(false);
        }
    }, [scoreTables])

    let maleFemale: JSX.Element[] = [];
    for (let i = 0; i < 10; i++) {
        maleFemale.push(
            <>
                <TableCell align="center">M</TableCell>
                <TableCell align="center">F</TableCell>
            </>
        )
    }

    let findResult = (scale: ScoreScale, gender: string, ageGroup: string, score: number): string => {
        let scores = gender === "female" ? scale.fscores : scale.mscores;
        let ageGroupScores = Reflect.get(scores, ageGroup);
        let result = "-";
        Object.entries(ageGroupScores)
            .forEach(entry => {
                if (entry[1] === score.toString()) {
                    result = entry[0];
                    return;
                }
            })
        return result;
    }

    let scoreData = (scale: ScoreScale) => {
        let result: JSX.Element[] = [];
        for (let score = 100; score >= 0; score--) {
            result.push(
                <TableRow>
                    <TableCell align="center" className={styles.dataCell} >
                        <Typography variant="caption">{score}</Typography>
                    </TableCell>
                    <TableCell className={styles.dataCell} align="center">
                        <Typography variant="caption">{findResult(scale, "male", "17", score)}</Typography>
                    </TableCell>
                    <TableCell className={styles.dataCell} align="center">
                        <Typography variant="caption">{findResult(scale, "female", "17", score)}</Typography>
                    </TableCell>
                    <TableCell className={styles.dataCell} align="center">
                        <Typography variant="caption">{findResult(scale, "male", "22", score)}</Typography>
                    </TableCell>
                    <TableCell className={styles.dataCell} align="center">
                        <Typography variant="caption">{findResult(scale, "female", "22", score)}</Typography>
                    </TableCell>
                    <TableCell className={styles.dataCell} align="center">
                        <Typography variant="caption">{findResult(scale, "male", "27", score)}</Typography>
                    </TableCell>
                    <TableCell className={styles.dataCell} align="center">
                        <Typography variant="caption">{findResult(scale, "female", "27", score)}</Typography>
                    </TableCell>
                    <TableCell className={styles.dataCell} align="center">
                        <Typography variant="caption">{findResult(scale, "male", "32", score)}</Typography>
                    </TableCell>
                    <TableCell className={styles.dataCell} align="center">
                        <Typography variant="caption">{findResult(scale, "female", "32", score)}</Typography>
                    </TableCell>
                    <TableCell className={styles.dataCell} align="center">
                        <Typography variant="caption">{findResult(scale, "male", "37", score)}</Typography>
                    </TableCell>
                    <TableCell className={styles.dataCell} align="center">
                        <Typography variant="caption">{findResult(scale, "female", "37", score)}</Typography>
                    </TableCell>
                    <TableCell className={styles.dataCell} align="center">
                        <Typography variant="caption">{findResult(scale, "male", "42", score)}</Typography>
                    </TableCell>
                    <TableCell className={styles.dataCell} align="center">
                        <Typography variant="caption">{findResult(scale, "female", "42", score)}</Typography>
                    </TableCell>
                    <TableCell className={styles.dataCell} align="center">
                        <Typography variant="caption">{findResult(scale, "male", "47", score)}</Typography>
                    </TableCell>
                    <TableCell className={styles.dataCell} align="center">
                        <Typography variant="caption">{findResult(scale, "female", "47", score)}</Typography>
                    </TableCell>
                    <TableCell className={styles.dataCell} align="center">
                        <Typography variant="caption">{findResult(scale, "male", "52", score)}</Typography>
                    </TableCell>
                    <TableCell className={styles.dataCell} align="center">
                        <Typography variant="caption">{findResult(scale, "female", "52", score)}</Typography>
                    </TableCell>
                    <TableCell className={styles.dataCell} align="center">
                        <Typography variant="caption">{findResult(scale, "male", "57", score)}</Typography>
                    </TableCell>
                    <TableCell className={styles.dataCell} align="center">
                        <Typography variant="caption">{findResult(scale, "female", "57", score)}</Typography>
                    </TableCell>
                    <TableCell className={styles.dataCell} align="center">
                        <Typography variant="caption">{findResult(scale, "male", "62", score)}</Typography>
                    </TableCell>
                    <TableCell className={styles.dataCell} align="center">
                        <Typography variant="caption">{findResult(scale, "female", "62", score)}</Typography>
                    </TableCell>
                    <TableCell align="center" className={styles.dataCell} >
                        <Typography variant="caption">{score}</Typography>
                    </TableCell>
                </TableRow>
            )
        }
        return result;
    }

    return (
        <div className={styles.container}>
            {loading ? <CircularProgress disableShrink variant="indeterminate" /> : scoreTables}
        </div>
    );
}