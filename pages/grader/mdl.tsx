import HomeButton from "components/HomeButton"
import NumEntryTest from "components/NumEntryTest"
import React from 'react'

function MaxDeadlift() {
  return (
    <>
      <HomeButton />
      <NumEntryTest
          title="MAX DEADLIFT" 
          testName="mdl"
          unit="LBS"
          prevPageUrl="/admin"
          nextPageUrl="/grader/spt"
      />
    </>
  )
}

export default MaxDeadlift