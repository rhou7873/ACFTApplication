import SliderTest from 'components/SliderTest';
import NavBar from "components/NavBar";

export default function Home() {
  return (
    <div>
      <NavBar />
      <SliderTest 
        title="Max Deadlift" 
        sliderMin={0} 
        sliderMax={400}
        sliderStep={1}  
        unit="lbs"
      />
      {/* <SliderTest 
        title="Standing Power Throw" 
        sliderMin={0}
        sliderMax={20}
        sliderStep={0.1}
        unit="m"
      /> */}
    </div>
  )
}
