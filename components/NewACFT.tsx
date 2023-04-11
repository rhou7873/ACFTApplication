import { Button, MenuItem, TextField, Typography } from "@mui/material";
import { LocalizationProvider, MobileDateTimePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { useRouter } from "next/router";
import React, { useState } from "react";
import styles from "styles/Form.module.css";

interface ACFT {
    location: string,
    date: dayjs.Dayjs,
    admins: string[],
    graders: string[],
    soldiers: string[]
}

function NewACFT() {
    const [location, setLocation] = useState("");
    const [date, setDate] = useState(dayjs(new Date("1000-1-1")));
    const [dateError, setDateError] = useState(false);
    const [adminStr, setAdminStr] = useState("");
    const [graderStr, setGraderStr] = useState("");
    const [soldierStr, setSoldierStr] = useState("");

    let getEmails = (emailStr: string) => emailStr.split(",").map(email => {
        return email.trim().toLowerCase();
    });

    let router = useRouter();
  
    let handleSubmit = async (e: any) => {
      e.preventDefault();
      if (date.year() === 1000) {
        setDateError(true);
        return;
      }
      let results: ACFT = {
        location: location,
        date: date,
        admins: getEmails(adminStr),
        graders: getEmails(graderStr),
        soldiers: getEmails(soldierStr),
      };
      await fetch("../api/acfts", {
          method: "POST",
          body: JSON.stringify(results)
      }).then(res => {
          router.push("/admin")
      });
    }
  
    return (
      <div className={styles.container}>
        <Typography variant="h3">Schedule ACFT</Typography>
        <form onSubmit={handleSubmit}>
          <div className={styles.formContainer}>
            <TextField 
              className={styles.inputField}
              value={location} 
              onChange={e => setLocation(e.target.value)} 
              size="small"
              name="location"
              label="Location Name"
              required 
            /> 
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <MobileDateTimePicker 
                label="Date"
                slotProps={{
                  textField: { 
                    required: true, 
                    error: dateError, 
                    size: "small",
                    margin: "normal",
                    sx: { margin: "15px" }
                  }
                }}
                slots={{ textField: TextField }}
                onChange={value => setDate(value as dayjs.Dayjs)}
              />
            </LocalizationProvider>
            <TextField 
                className={styles.inputField}
                onChange={e => setAdminStr(e.target.value)}
                value={adminStr}
                size="small"
                name="admins"
                label="Administrators"
                helperText="Emails separated by commas"
                required
            />
            <TextField 
                className={styles.inputField}
                onChange={e => setGraderStr(e.target.value)}
                value={graderStr}
                size="small"
                name="graders"
                label="Graders"
                helperText="Emails separated by commas"
                required
            />
            <TextField 
                className={styles.inputField}
                onChange={e => setSoldierStr(e.target.value)}
                value={soldierStr}
                size="small"
                name="soldiers"
                label="Soldiers"
                helperText="Emails separated by commas"
                required
            />
            <Button 
              className={styles.submitButton}
              size="large"
              type="submit"
              variant="contained">
                Submit
            </Button>
          </div>
        </form>
      </div>
    );
}

export default NewACFT