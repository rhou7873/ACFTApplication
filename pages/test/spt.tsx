import NumEntryTest from "components/NumEntryTest"
import React from 'react'

function StandingPowerThrow() {
  return (
    <NumEntryTest 
        title="STANDING POWER THROW" 
        testName="spt"
        sliderMin={0} 
        sliderMax={40}
        sliderStep={0.1}  
        unit="M"
        prevPageUrl="/test/mdl"
        nextPageUrl="/test/hrp"
    />
  )
}

export default StandingPowerThrow