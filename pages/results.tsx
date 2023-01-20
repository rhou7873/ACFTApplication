import { useEffect, useState } from 'react';
import NavBar from '../components/navBar';

export default function Results() {
    let [soldierData, setSoldierData] = useState<any[]>([]);

    useEffect(() => {
        fetch("./api/soldier", { method: "GET" })
            .then(res => {
                res.json().then(json => {
                    console.log(json);
                    setSoldierData(json);
                })
            });
    }, []);

    return (
        <div>
            <NavBar></NavBar>
            {soldierData.map(soldier => {
                return (
                    <div key={soldier._id}>
                        <p><b>Name: {soldier.name}</b></p>
                        <p>&emsp;Email: {soldier.email}</p>
                        <p>&emsp;Age: {soldier.age}</p>
                        <p>&emsp;Gender: {soldier.gender}</p>
                        <p>&emsp;MDL: {soldier.mdl}</p>
                        <p>&emsp;SPT: {soldier.spt}</p>
                        <p>&emsp;HRP: {soldier.hrp}</p>
                        <p>&emsp;SDC: {soldier.sdc}</p>
                        <p>&emsp;PLK: {soldier.plk}</p>
                        <p>&emsp;2MR: {soldier.run}</p>
                        <p>&emsp;Score: {soldier.score}</p>
                        <br />
                        <br/>
                    </div>
                )
            })}
        </div>
    )
}

