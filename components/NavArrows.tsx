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
        <img className={styles.invertedArrow} src="/arrow.svg" />
      </Button>
      <span>&nbsp;</span> 
      <Button
        variant="contained"
        onClick={() => router.push(props.nextPageUrl as string)}>
          <img src="/arrow.svg" />
      </Button>
    </div>
  )
}

export default NavArrows