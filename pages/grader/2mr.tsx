import NavBar from "components/NavBar"
import StopwatchTest from "components/StopwatchTest"
import React from 'react'

function TwoMileRun() {
  return (
    <>
      <StopwatchTest 
        title="TWO-MILE RUN"
        testName="tmr" 
        threshold={15} 
        prevPageUrl="/grader/plk"
        nextPageUrl="/grader/results" />
    </>
  )
}

export default TwoMileRun