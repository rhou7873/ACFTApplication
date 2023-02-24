import StopwatchTest from "components/StopwatchTest"
import React from 'react'

function Plank() {
  return (
    <StopwatchTest 
      title="PLANK" 
      threshold={15}
      prevPageUrl="/test/sdc" 
      nextPageUrl="/test/2mr" />
  )
}

export default Plank