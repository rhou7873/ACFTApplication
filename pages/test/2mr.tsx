import StopwatchTest from "components/StopwatchTest"
import React from 'react'

function TwoMileRun() {
  return (
    <StopwatchTest 
      title="TWO-MILE RUN"
      testName="tmr" 
      threshold={15} 
      prevPageUrl="/test/plk"
      nextPageUrl="/" />
  )
}

export default TwoMileRun