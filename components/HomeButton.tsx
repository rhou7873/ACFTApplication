import { Button } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { getCookie } from "cookies-next";

function HomeButton() {
  let [role, setRole] = useState("None");

  let router = useRouter();

  let handleClick = (e: any) => {
    router.push(`/${role}`);
  }

  useEffect(() => {
    setRole((getCookie("role") as string).toLowerCase());
  }, []);

  return (
    <div className="homeButtonContainer">
        <Button 
          onClick={handleClick} 
          variant="contained"
          size="large"
          sx={{ position: "absolute", borderRadius: 5 }}>
            <HomeIcon />
        </Button>
    </div>
  )
}

export default HomeButton