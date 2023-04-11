import { Typography } from "@mui/material"
import NavBar from "components/NavBar";
import React, { useContext, useEffect, useState } from "react";
import { getCookie } from "cookies-next";
import Logout from "components/Logout";

function AdminHome() {
  const [session, setSession] = useState({
    loggedIn: false,
    email: "",
    firstName: "",
    lastName: "",
    role: ""
  });

  useEffect(() => {
    setSession({
      loggedIn: getCookie("loggedIn")?.valueOf() as boolean,
      email: getCookie("email")?.valueOf() as string,
      firstName: getCookie("firstName")?.valueOf() as string,
      lastName: getCookie("lastName")?.valueOf() as string,
      role: getCookie("role")?.valueOf() as string
    })
  }, []);

  return (
    <>
      <Logout />
        <div className="container">
          <div style={{ marginTop: 30 }}>
            <Typography variant="h2">Features Demo</Typography>
          </div>
          <Typography sx={{ marginTop: 3 }}>Admin Features</Typography>
          <NavBar
            elements={[
              { title: "Register Grader", route: "register/grader"},
              { title: "Schedule ACFT", route: "admin/schedule-acft"},
              { title: "Scoring Scale", route: "admin/scoring-scale" },
            ]}
          />
          <Typography sx={{ marginTop: 3 }}>Grader Features</Typography>
          <NavBar
            elements={[
              { title: "Register Soldier", route: "register/soldier" },
              { title: "Start Test", route: "grader/mdl"},
            ]}
          />
          <Typography sx={{ marginTop: 3 }}>Soldier Features</Typography>
          <NavBar
            elements={[
              { title: "View Scorecard", route: "soldier/active-test"},
            ]}
          />
      </div>
    </>
  )
}

export default AdminHome