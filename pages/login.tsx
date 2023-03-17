import { Button, TextField, Typography } from "@mui/material"
import React, { useEffect, useState } from "react";
import styles from "styles/Login.module.css";
import sha256 from "crypto-js/sha256";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  let handleLogin = () => {
    
  }

  return (
    <div>
      <Typography className={styles.header} variant="h4">Login</Typography>
      <form className={styles.loginContainer} onSubmit={handleLogin}>
        <TextField 
            className={styles.inputField}
            value={email} 
            onChange={e => setEmail(e.target.value)} 
            size="small"
            name="email"
            label="Email"
            type="email"
            required />
          <TextField 
            className={styles.inputField}
            value={password} 
            onChange={e => setPassword(e.target.value)} 
            size="small"
            name="password"
            label="Password"
            type="password"
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