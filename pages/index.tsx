import NavBar from '../components/navBar'
import clientPromise from '../lib/mongodb';

interface Props {
    isConnected: boolean;
    soldier: Object;
}

export async function getServerSideProps(context: any){
    try {
        const client = await clientPromise;
        const db = client.db("appData");
        const allPosts = await db.collection("soldierData").find({}).toArray();
        return {
            props: {
                soldier: JSON.parse(JSON.stringify(allPosts)),
                isConnected: true
            }
        }
    } catch (e) {
      console.error(e)
      return {
        props: { soldier: null, isConnected: false },
      }
    }
}

export default function Home(props: Props) {
  return (
    <div>
        <NavBar></NavBar>
        <img src="army_derp.jpg"></img>
        <h1>i am da armeh</h1>
    </div>
  )
}
