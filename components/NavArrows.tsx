import { useRouter } from "next/router";
import React from "react";
import { Button } from "@mui/material";
import styles from "styles/NavArrows.module.css"

interface NavArrowProps {
  prevPageUrl: string,
  nextPageUrl: string
}

function NavArrows(props: NavArrowProps) {
  const router = useRouter();
  return (
    <div> 
      <Button
        variant="contained"
        onClick={() => router.push(props.prevPageUrl as string)}>
        ← 
      </Button>
      <span>&nbsp;</span> 
      <Button
        className={styles.nextButtons}
        variant="contained"
        onClick={() => router.push(props.nextPageUrl as string)}>
        →
      </Button>
    </div>
  )
}

export default NavArrows