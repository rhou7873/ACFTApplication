import { Button } from "@mui/material";
import NavBar from "components/NavBar";
import { useRouter } from "next/navigation";
import NewSoldierForm from "components/NewSoldierForm";
import { useEffect } from "react";

export default function Home() {
  const router = useRouter()

  return (
    <div className="startTestContainer">
      <Button 
        className="startTestBtn"
        onClick={() => router.push("/grader/mdl")}
        variant="contained"
        size="large"
        color="secondary"
        fullWidth>
        Start Test
      </Button>
    </div>
  )
}
