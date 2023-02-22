import SliderTest from "components/SliderTest"
import React from 'react'

function MaxDeadlift() {
  return (
    <SliderTest 
        title="MAX DEADLIFT" 
        sliderMin={0} 
        sliderMax={400}
        sliderStep={1}  
        unit="LBS"
        nextPageUrl="/test/spt"
    />
  )
}

export default MaxDeadlift