import { useEffect, useState } from 'react';
import NavBar from 'components/NavBar';
import Card from "@mui/material/Card";
import { Button, CardContent, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import Soldier from "types/soldier";
import { mdl, spt, hrp, sdc, plk, tmr, timeToString } from 'lib/scoreUtilities';
import NavArrows from "components/NavArrows";
import { useRouter } from "next/router";

export default function Results() {
    let [soldierData, setSoldierData] = useState<any[]>([]);

    const router = useRouter();

    useEffect(() => {
        fetch("../api/soldiers", { method: "GET" })
            .then(res => {
                res.json().then(json => {
                    setSoldierData(json);
                })
            });
    }, []);

    const cardStyle = {
        padding: 3,
        marginBottom: 5,        
        borderRadius: 3,
        border: 1,
        boxShadow: 4
    };

    return (
        <div>
            <div style={{ marginTop: 20 }}>
                {soldierData.map((soldier: Soldier) => {
                    soldier.score = mdl(soldier, soldier.mdl) + spt(soldier, soldier.spt) + hrp(soldier, soldier.hrp) + sdc(soldier, soldier.sdc) + sdc(soldier, soldier.plk) + sdc(soldier, soldier.tmr);

                    return (
                        <Card key={soldier._id.toString()} sx={cardStyle}>
                            <CardContent sx={{ userSelect: "none" }}>
                                <Typography variant="h4">
                                    {soldier.firstName} {soldier.lastName}
                                </Typography>
                                <Typography variant="subtitle1">
                                    <i>{soldier.gender}, {soldier.age}</i>
                                </Typography>
                                <TableContainer sx={{ marginBottom: 4 }}>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>
                                                <Typography variant="h6">Test</Typography>
                                            </TableCell>
                                            <TableCell>
                                                <Typography variant="h6">Result</Typography>
                                            </TableCell>
                                            <TableCell>
                                                <Typography variant="h6">Score</Typography>
                                            </TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        <TableRow>
                                            <TableCell>MDL</TableCell>
                                            <TableCell>{soldier.mdl} lbs</TableCell>
                                            <TableCell>{mdl(soldier, soldier.mdl)}</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell>SPT</TableCell>
                                            <TableCell>{soldier.spt.toFixed(1)} m</TableCell>
                                            <TableCell>{spt(soldier, soldier.spt)}</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell>HRP</TableCell>
                                            <TableCell>{soldier.hrp} reps</TableCell>
                                            <TableCell>{hrp(soldier, soldier.hrp)}</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell>SDC</TableCell>
                                            <TableCell>{timeToString(soldier.sdc)}</TableCell>
                                            <TableCell>{sdc(soldier, soldier.sdc)}</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell>PLK</TableCell>
                                            <TableCell>{timeToString(soldier.plk)}</TableCell>
                                            <TableCell>{plk(soldier, soldier.plk)}</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell>2MR</TableCell>
                                            <TableCell>{timeToString(soldier.tmr)}</TableCell>
                                            <TableCell>{tmr(soldier, soldier.tmr)}</TableCell>
                                        </TableRow>
                                    </TableBody>
                                </TableContainer>
                                <Typography variant="h5">
                                    <b>Total Score: {soldier.score}</b>
                                </Typography>
                            </CardContent>
                        </Card>
                    )
                })}
                <Button 
                    variant="contained" 
                    size="large" 
                    onClick={() => router.push("/")}
                    fullWidth>
                        Confirm Results
                </Button>
                <NavArrows prevPageUrl="/test/2mr" nextPageUrl="/" />
            </div>
        </div>
    )
}

