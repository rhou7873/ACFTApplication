import SliderTest from "components/NumEntryTest"
import React from 'react'

function HandReleasePushUps() {
  return (
    <SliderTest 
        title="HAND RELEASE PUSH-UPS" 
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