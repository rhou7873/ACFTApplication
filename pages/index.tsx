import { Button } from "@mui/material";
import NavBar from "components/NavBar";
import { useRouter } from "next/navigation";
import NewSoldierForm from "components/NewSoldierForm";
import { useEffect } from "react";

export default function Home() {
  const router = useRouter()

  return (
    <div>
      <NavBar />
      <Button 
        onClick={() => router.push("/test/mdl")}
        variant="contained"
        sx={{ marginTop: 5 }}>
        Start Test
      </Button>
    </div>
  )
}
