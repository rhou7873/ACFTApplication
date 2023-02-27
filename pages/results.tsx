import { useEffect, useState } from 'react';
import NavBar from 'components/NavBar';
import Card from "@mui/material/Card";
import { CardContent, Typography } from '@mui/material';
import Soldier from "types/soldier";

export default function Results() {
    let [soldierData, setSoldierData] = useState<any[]>([]);

    useEffect(() => {
        fetch("./api/soldiers", { method: "GET" })
            .then(res => {
                res.json().then(json => {
                    setSoldierData(json);
                })
            })
    }, []);

    const cardStyle = {
        marginBottom: 5,        
        borderRadius: 2,
        backgroundColor: "#F0F0F0",
        
    };

    return (
        <div>
            <NavBar></NavBar>
            <div style={{ marginTop: 20 }}>
                {soldierData.map((soldier: Soldier) => {
                    return (soldier.score != -1 &&
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
                                    <p>Age Group: {soldier.ageGroup}</p>
                                    <p>Gender: {soldier.gender}</p>
                                    <p>MDL: {soldier.mdl}</p>
                                    <p>SPT: {soldier.spt}</p>
                                    <p>HRP: {soldier.hrp}</p>
                                    <p>SDC: {soldier.sdc}</p>
                                    <p>PLK: {soldier.plk}</p>
                                    <p>2MR: {soldier.tmr}</p>
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

