import NavBar from '../react_components/nav_bar'
import clientPromise from '../lib/mongodb';

interface Props {
    isConnected: boolean;
    soldier_data: Object;
}

export async function getServerSideProps(context: any) {
    try {
        const client = await clientPromise;
        const db = client.db("app-data");
        const allPosts = await db.collection("soldier_data").find({}).toArray();
        return {
            props: {
                soldier_data: JSON.parse(JSON.stringify(allPosts)),
                isConnected: true
            }
        }
    } catch (e) {
      console.error(e)
      return {
        props: { soldier_data: null, isConnected: false },
      }
    }
}

export default function Results(props : Props) {
    return (
        <div>
            <NavBar></NavBar>
            <h1 style={{fontSize : 11}}>{JSON.stringify(props.soldier_data)}</h1>
        </div>
    )
}

