import { Button } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import React from "react";
import { useRouter } from "next/router";

function HomeButton() {
  let router = useRouter();

  let handleClick = (e: any) => {
    router.push("/");
  }

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