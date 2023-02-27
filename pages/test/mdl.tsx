import NumEntryTest from "components/NumEntryTest"
import React from 'react'

function MaxDeadlift() {
  return (
    <NumEntryTest
        title="MAX DEADLIFT" 
        testName="mdl"
        sliderMin={0} 
        sliderMax={400}
        sliderStep={1}  
        unit="LBS"
        prevPageUrl="/"
        nextPageUrl="/test/spt"
    />
  )
}

export default MaxDeadlift