import { Button, Typography } from "@mui/material";
import Login from "components/Login";
import { hasCookie, setCookie } from "cookies-next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import styles from "styles/RoleSelect.module.css";

export default function Index() {
  let router = useRouter();

  let handleRoleButton = (role: string) => {
    setCookie("role", role);
    router.push("/login");
    console.log(role);
  }

  return (
    <>
      {/* <div className={styles.roleButtons}>
        <Typography 
          variant="h3"
          sx={{ marginBottom: 5 }}>
            Login as
        </Typography>
        <Button
          onClick={() => handleRoleButton("Soldier")}
          size="large"
          variant="contained"
          type="submit"
          sx={{ marginBottom: 7, height: 60 }}>
            Soldier
        </Button>
        <Button
          onClick={() => handleRoleButton("Grader")}
          size="large"
          variant="contained"
          type="submit"
          sx={{ marginBottom: 7, height: 60 }}>
            Grader
        </Button>
        <Button
          onClick={() => handleRoleButton("Admin")}
          size="large"
          variant="contained"
          type="submit"
          sx={{ marginBottom: 7, height: 60 }}>
            Administrator
        </Button> */}
      {/* </div> */}
      <Login />
    </>
  )
}
