import NumEntryTest from "components/NumEntryTest"
import React from 'react'

function MaxDeadlift() {
  return (
    <NumEntryTest
        title="MAX DEADLIFT" 
        testName="mdl"
        unit="LBS"
        prevPageUrl="/"
        nextPageUrl="/test/spt"
    />
  )
}

export default MaxDeadlift