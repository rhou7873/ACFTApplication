import { useState, useEffect } from "react";
import Navbar from "../components/navBar";

export default function aboutUs() {
    let [founders, setFounders] = useState<any[]>([]);
    
    useEffect(() => {
        fetch("./api/founders").then(res => {
            res.json().then(founders => {
                setFounders(founders);
            })
        })
    }, []);

    return (
        <>
            <Navbar></Navbar>
            {founders.map(founder => {
                return (
                    <div key={founder._id}>
                        <p><b>{founder.firstName} {founder.lastName}</b></p>
                        <p>&emsp;Email: {founder.email}</p>
                        <br />
                    </div>
                )
            })}
        </>
    )
}