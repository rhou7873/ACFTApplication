import clientPromise from '../lib/mongodb';
import NewSoldierForm from '../components/NewSoldierForm';
import Navbar from '../components/Navbar';
import SliderTest from '../components/SliderTest';

export default function Home() {
  return (
    <div>
      <Navbar />
      <SliderTest 
        title="Max Deadlift" 
        sliderMin={0} 
        sliderMax={400}
        sliderStep={1}  
      />
      <SliderTest 
        title="Standing Power Throw" 
        sliderMin={0}
        sliderMax={20}
        sliderStep={0.1}
      />
    </div>
  )
}
