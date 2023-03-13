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
    const [menuItems, setMenuItems] = useState<JSX.Element[]>([]);
    const [loading, setLoading] = useState(true);

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
                soldiers.sort((a, b) => a.mdl - b.mdl).reverse();
            }
            setCurrSoldier(soldiers[0]);
        }
        setMenuItems(soldiers.map(soldier => {
            return (
                <MenuItem 
                    key={soldier._id.toString()}
                    value={soldier._id.toString()}>
                        {soldier.firstName} {soldier.lastName}
                </MenuItem>
            )
        }))
    }, [soldiers])
    
    // Syncs currSoldier with parent and updates dropdownVal
    useEffect(() => {
        if (currSoldier != undefined) {
            props.syncData(currSoldier);
            setDropdownVal(currSoldier._id.toString());
        }
    }, [currSoldier])

    useEffect(() => {
        if (menuItems.length > 0) {
            setLoading(false);
        }
    }, [menuItems])

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
                {loading ? 
                    <MenuItem>
                        <i>Fetching soldiers...</i>
                    </MenuItem> :
                    menuItems
                } 
            </TextField>     
        </div>
    )
}

export default SoldierDropdown