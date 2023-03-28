import { Button } from "@mui/material";
import NavBar from "components/NavBar";
import { useRouter } from "next/navigation";
import Registration, { RegistrationType } from "components/Registration";
import { useEffect } from "react";
import Login from "components/Login";
import NewACFT from "components/NewACFT";

export default function Home() {
  return (
    <>
      <Login />
    </>
  )
}
