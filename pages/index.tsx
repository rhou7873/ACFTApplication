import SliderTest from 'components/SliderTest';
import NavBar from "components/NavBar";
import ACFTNumPad from "components/ACFTNumPad";
import Stopwatch from '../components/Stopwatch'

export default function Home() {
  return (
    <div>
      <NavBar />
      <SliderTest 
        title="Max Deadlift" 
        sliderMin={0} 
        sliderMax={400}
        sliderStep={10}  
        unit="lbs"
      />
      <SliderTest 
        title="Standing Power Throw" 
        sliderMin={0} 
        sliderMax={40}
        sliderStep={1}  
        unit="meters"
      />
      <SliderTest 
        title="Hand Release Pushups" 
        sliderMin={0} 
        sliderMax={400}
        sliderStep={10}  
        unit="reps"
      />
      <Stopwatch title="Two-Mile Run" threshold={15}/>
      <Stopwatch title="Plank" threshold={15}/>
      <Stopwatch title="Sprint Drag Carry" threshold={15}/>
      {/* <SliderTest 
        title="Standing Power Throw" 
        sliderMin={0}
        sliderMax={20}
        sliderStep={0.1}
        unit="m"
      /> */}
      {/* <ACFTNumPad /> */}
    </div>
  )
}
