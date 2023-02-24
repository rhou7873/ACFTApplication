import { useRouter } from "next/router";
import React from "react";
import { Button } from "@mui/material";

interface NavArrowProps {
  prevPageUrl?: string,
  nextPageUrl?: string
}

function NavArrows(props: NavArrowProps) {
  const router = useRouter();

  return (
    <div>
      {props.prevPageUrl != undefined && 
        <Button
          variant="contained"
          onClick={() => router.push(props.prevPageUrl as string)}>
          🡄 
        </Button>
      }
      <span>&nbsp;</span> 
      {props.nextPageUrl != undefined &&
        <Button
          variant="contained"
          onClick={() => router.push(props.nextPageUrl as string)}>
            🡆
        </Button>
      }
    </div>
  )
}

export default NavArrows