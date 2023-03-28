import { Button, TextField, Typography } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import React, { useContext, useEffect, useState } from "react";
import styles from "styles/Login.module.css";
import sha256 from "crypto-js/sha256";
import { useRouter } from "next/router";
import { setCookie } from "cookies-next";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState(false);
  const [loginLoading, setLoginLoading] = useState(false);

  let router = useRouter();

  let handleLogin = (e: any) => {
    e.preventDefault();
    setLoginLoading(true);
    fetch(`/api/users/${email}/${sha256(password).toString()}`)
      .then(res => {
        res.json().then(json => {
          if (json.success === "false") {
            setLoginError(true);
          } else {
            switch (json.user.role) {
                case "Soldier":
                    router.push("/soldier");
                    break;
                case "Grader":
                    router.push("/grader");
                    break;
                case "Admin":
                    router.push("/admin");
                    break;
                default:
                    console.log("what da heck happened");
            }
          }
          setLoginLoading(false);
        })
      });
  }

  return (
    <div>
        <Typography className={styles.header} variant="h4">Login</Typography>
        <form className={styles.loginContainer} onSubmit={handleLogin}>
          <TextField 
              className={styles.inputField}
              error={loginError}
              value={email} 
              onChange={e => {setLoginError(false); setEmail(e.target.value)}} 
              name="email"
              label="Email"
              type="email"
              required />
            <TextField 
              className={styles.inputField}
              error={loginError}
              value={password} 
              onChange={e => {setLoginError(false); setPassword(e.target.value)}} 
              name="password"
              label="Password"
              type="password"
              helperText={loginError ? "Email or password invalid" : ""}
              required />    
            {loginLoading &&
              <LoadingButton
                size="large"
                variant="contained"
                type="submit"
                loading={loginLoading}
                sx={{ height: 60 }} />        
            }
            {!loginLoading &&
              <Button
                size="large"
                variant="contained"
                type="submit"
                sx={{ height: 60 }}>
                  Login
              </Button>
            }
      </form>
    </div>
  )
}

export default Login