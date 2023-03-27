import { Typography } from "@mui/material";
import NavBar from "components/NavBar";
import React, { useEffect, useState } from "react";
import { getCookie } from "cookies-next";

function SoldierHome() {
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
      <NavBar
        elements={[
          { title: "Home", route: "soldier" },
          { title: "Active Test", route: "soldier/active-test"}
        ]}
      />
      <div style={{ marginTop: 30 }}>
        <Typography variant="h2"><i>Hello, <b>{session.firstName}</b></i></Typography>
      </div>
    </>
  )
}

export default SoldierHome