import { Typography } from "@mui/material";
import NavBar from "components/NavBar";
import React, { useEffect, useState } from "react";
import { getCookie } from "cookies-next";
import Logout from "components/Logout";

function GraderHome() {
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
      <NavBar
        elements={[
          { title: "Home", route: "grader" },
          { title: "Start Test", route: "grader/mdl" },
          { title: "Register Soldier", route: "register/soldier"}
        ]}
      />
      <div style={{ marginTop: 30 }}>
        <Typography variant="h2"><i>Hello, <b>{session.firstName}</b></i></Typography>
      </div>
    </>
  )
}

export default GraderHome