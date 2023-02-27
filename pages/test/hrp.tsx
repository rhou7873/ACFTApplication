import NumEntryTest from "components/NumEntryTest"
import React from 'react'

function HandReleasePushUps() {
  return (
    <NumEntryTest 
        title="HAND RELEASE PUSH-UPS"
        testName="hrp"
        sliderMin={0} 
        sliderMax={100}
        sliderStep={1}  
        unit="REPS"
        nextPageUrl="/test/sdc"
        prevPageUrl="/test/spt"
    />
  )
}

export default HandReleasePushUps