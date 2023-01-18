import NavBar from '../react_components/nav_bar'

export async function getServerSideProps(context: any) {
    try {
      const url = "http://localhost:3000/api/testApi";
      let res = await fetch(url);
      let soldier_data = await res.json();
      return {
        props: {
          soldier_data: soldier_data,
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

export default function Results(props : any) {
    return (
        <div>
            <NavBar></NavBar>
            <h1>{JSON.stringify(props.soldier_data)}</h1>
        </div>
    )
}

