import { Button, TextField, Typography } from "@mui/material"
import React, { useEffect, useState } from "react";
import styles from "styles/Login.module.css";
import sha256 from "crypto-js/sha256";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState(false);

  let handleLogin = (e: any) => {
    e.preventDefault();
    fetch(`/api/soldiers/login/${email}/${sha256(password).toString()}`)
      .then(res => {
        if (!res.ok) {
          setLoginError(true);
        } else {
          console.log("login success")
        }
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
            size="small"
            name="email"
            label="Email"
            type="email"
            required />
          <TextField 
            className={styles.inputField}
            error={loginError}
            value={password} 
            onChange={e => {setLoginError(false); setPassword(e.target.value)}} 
            size="small"
            name="password"
            label="Password"
            type="password"
            helperText={loginError ? "Email or password invalid" : ""}
            required />    
          <Button
            variant="contained"
            type="submit">
              Login
          </Button>
      </form>
    </div>
  )
}

export default Login