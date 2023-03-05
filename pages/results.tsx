import { useEffect, useState } from 'react';
import NavBar from 'components/NavBar';
import Card from "@mui/material/Card";
import { CardContent, Typography } from '@mui/material';
import Soldier from "types/soldier";
import { mdl, spt, hrp, sdc, plk, tmr } from 'lib/scoreUtilities';

export default function Results() {
    let [soldierData, setSoldierData] = useState<any[]>([]);

    useEffect(() => {
        fetch("./api/soldiers", { method: "GET" })
            .then(res => {
                res.json().then(json => {
                    setSoldierData(json);
                })
            });
    }, []);

    const cardStyle = {
        padding: 3,
        marginBottom: 5,        
        borderRadius: 2,
        backgroundColor: "#F0F0F0",
        
    };

    return (
        <div>
            <div style={{ marginTop: 20 }}>
                {soldierData.map((soldier: Soldier) => {
                    soldier.score = mdl(soldier, soldier.mdl) + spt(soldier, soldier.spt) + hrp(soldier, soldier.hrp) + sdc(soldier, soldier.sdc) + sdc(soldier, soldier.plk) + sdc(soldier, soldier.tmr);

                    return (/* soldier.score != -1 && */
                        <Card key={soldier._id.toString()} sx={cardStyle}>
                            <CardContent>
                                <Typography variant="h4">
                                    {soldier.firstName} {soldier.lastName}
                                </Typography>
                                <Typography color="text.secondary" sx={{ fontSize: 15 }} >
                                    <i>Email: {soldier.email}</i>
                                </Typography>
                                <Typography sx={{ marginLeft: 3 }} >
                                    <p>Age: {soldier.age}</p>
                                    <p>Age Group: {soldier.ageGroup}-{soldier.ageGroup + 4}</p>
                                    <p>Gender: {soldier.gender}</p>
                                    <p>MDL: {soldier.mdl + " -> " + mdl(soldier, soldier.mdl)}</p>
                                    <p>SPT: {soldier.spt + " -> " + spt(soldier, soldier.spt)}</p>
                                    <p>HRP: {soldier.hrp + " -> " + hrp(soldier, soldier.hrp)}</p>
                                    <p>SDC: {soldier.sdc + " -> " + sdc(soldier, soldier.sdc)}</p>
                                    <p>PLK: {soldier.plk + " -> " + plk(soldier, soldier.plk)}</p>
                                    <p>2MR: {soldier.tmr + " -> " + tmr(soldier, soldier.tmr)}</p>
                                    <p>Score: {soldier.score}</p>
                                </Typography>
                            </CardContent>
                        </Card>
                    )
                })}
            </div>
        </div>
    )
}

