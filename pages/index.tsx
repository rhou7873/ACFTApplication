import SliderTest from 'components/SliderTest';
import NavBar from "components/NavBar";
import ACFTNumPad from "components/ACFTNumPad";
import Stopwatch from '../components/Stopwatch'

export default function Home() {
  return (
    <div>
      <NavBar />
      <SliderTest 
        title="MAX DEADLIFT" 
        sliderMin={0} 
        sliderMax={400}
        sliderStep={1}  
        unit="LBS"
      />
      <SliderTest 
        title="STANDING POWER THROW" 
        sliderMin={0} 
        sliderMax={40}
        sliderStep={0.1}  
        unit="M"
      />
      <SliderTest 
        title="HAND RELEASE PUSH-UPS" 
        sliderMin={0} 
        sliderMax={100}
        sliderStep={1}  
        unit="REPS"
      />
      <Stopwatch title="PLANK" threshold={15}/>
      <Stopwatch title="SPRINT DRAG CARRY" threshold={15}/>
      <Stopwatch title="TWO-MILE RUN" threshold={15}/>
    </div>
  )
}
