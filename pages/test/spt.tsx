import SliderTest from "components/SliderTest"
import React from 'react'

function StandingPowerThrow() {
  return (
    <SliderTest 
        title="STANDING POWER THROW" 
        sliderMin={0} 
        sliderMax={40}
        sliderStep={0.1}  
        unit="M"
        nextPageUrl="/test/hrp"
    />
  )
}

export default StandingPowerThrow