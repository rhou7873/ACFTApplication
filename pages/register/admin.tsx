import React from "react"
import Registration, { RegistrationType } from "components/Registration"

function Register() {
  return (
    <Registration type={RegistrationType.Admin} />
  )
}

export default Register