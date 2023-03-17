import StopwatchTest from "components/StopwatchTest"
import React from 'react'

function Plank() {
  return (
    <StopwatchTest 
      title="PLANK" 
      testName="plk"
      threshold={15}
      prevPageUrl="/grader/sdc" 
      nextPageUrl="/grader/2mr" />
  )
}

export default Plank