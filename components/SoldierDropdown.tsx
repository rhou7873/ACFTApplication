import { MenuItem, TextField } from "@mui/material";
import React, { useEffect, useState } from "react"
import Soldier from "types/soldier";
import styles from "styles/SoldierDropdown.module.css";

interface SoldierDropdownProps {
    error: boolean,
    onChange(): void,
    syncData(currSoldier: Soldier): void,
    testName: string
}

function SoldierDropdown(props: SoldierDropdownProps) {
    const [dropdownVal, setDropdownVal] = useState("");
    const [soldiers, setSoldiers] = useState([] as Soldier[]);
    const [currSoldier, setCurrSoldier] = useState<Soldier>();

    // Initializes soldiers array on first render
    useEffect(() => {
        fetch("../api/soldiers", { method: "GET" })
            .then(res => {
                res.json().then(json => {
                    setSoldiers(json);
                })
            })
    }, []);

    // Orders soldiers based on MDL result and updates currSoldier
    useEffect(() => {
        if (soldiers.length > 0) {
            if (props.testName !== "mdl") {
            soldiers.sort((a, b) => a.mdl - b.mdl);
            }
            setCurrSoldier(soldiers[soldiers.length - 1]);
        }
    }, [soldiers])
    
    // Syncs currSoldier with parent and updates dropdownVal
    useEffect(() => {
        if (currSoldier != undefined) {
            props.syncData(currSoldier);
            setDropdownVal(currSoldier._id.toString());
        }
    }, [currSoldier])

    // Handler for dropdown selection change
    function handleSelect(e: any) {
        props.onChange();
        soldiers.forEach(soldier => {
            if (soldier._id.toString() === e.target.value) {
                setCurrSoldier(soldier);
            }
        })
    }

    return (
        <div className={styles.container}>
            <TextField
                defaultValue=""
                value={dropdownVal}
                onChange={e => handleSelect(e)}
                error={props.error}
                variant="outlined"
                fullWidth
                select>
                {soldiers.map(soldier => {
                    return (
                    <MenuItem 
                        key={soldier._id.toString()}
                        value={soldier._id.toString()}>
                        {soldier.firstName} {soldier.lastName}
                    </MenuItem>
                    )
                })} 
            </TextField>     
        </div>
    )
}

export default SoldierDropdown