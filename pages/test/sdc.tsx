import StopwatchTest from "components/StopwatchTest"
import React from 'react'

function SprintDragCarry() {
  return (
    <StopwatchTest 
      title="SPRINT / DRAG / CARRY" 
      testName="sdc"
      threshold={15}
      prevPageUrl="/test/hrp"
      nextPageUrl="/test/plk" />
  )
}

export default SprintDragCarry