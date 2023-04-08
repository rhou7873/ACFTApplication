import React from "react"
import Registration, { RegistrationType } from "components/Registration"
import HomeButton from "components/HomeButton"

function Register() {
  return (
    <>
      <HomeButton />
      <Registration type={RegistrationType.Soldier} />
    </>
  )
}

export default Register