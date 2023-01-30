import { useEffect, useState } from 'react';
import NavBar from '../components/navBar';
import Card from "@mui/material/Card";
import { CardContent, Typography } from '@mui/material';

export default function Results() {
    let [soldierData, setSoldierData] = useState<any[]>([]);

    useEffect(() => {
        let controller = new AbortController();
        fetch("./api/soldiers", { method: "GET", signal: controller.signal })
            .then(res => {
                res.json().then(json => {
                    setSoldierData(json);
                })
            })
        return () => { console.log("abort"); controller.abort();}
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
                {soldierData.map(soldier => {
                    return (
                        <Card key={soldier._id} sx={cardStyle}>
                            <CardContent>
                                <Typography variant="h4">
                                    {soldier.name}
                                </Typography>
                                <Typography color="text.secondary" sx={{ fontSize: 15 }} >
                                    <i>Email: {soldier.email}</i>
                                </Typography>
                                <Typography sx={{ marginLeft: 3 }} >
                                    <p>Age: {soldier.age}</p>
                                    <p>Gender: {soldier.gender}</p>
                                    <p>MDL: {soldier.mdl}</p>
                                    <p>SPT: {soldier.spt}</p>
                                    <p>HRP: {soldier.hrp}</p>
                                    <p>SDC: {soldier.sdc}</p>
                                    <p>PLK: {soldier.plk}</p>
                                    <p>2MR: {soldier.run}</p>
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

