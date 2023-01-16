import Head from 'next/head'
import clientPromise from '../lib/mongodb'
import { InferGetServerSidePropsType } from 'next'
import Founder, { FounderType } from '../components/founder';

type Props = {
  founders: FounderType[],
  isConnected: boolean
}

export async function getServerSideProps(context: any) {
  try {
    const url = process.env.NEXT_PUBLIC_VERCEL_URL + "/api/founders";
    let res = await fetch(url);
    let founders = await res.json();
    return {
      props: {
        founders: founders,
        isConnected: true
      }
    }
  } catch (e) {
    console.error(e)
    return {
      props: { founders: null, isConnected: false },
    }
  }
}

export default function Home({ founders , isConnected}: Props) {
  if (isConnected && founders) {
    return (
      founders.map((founder: any) => {
        return <Founder founder={founder} />
      })
    )
  } else {
    return (
      <h1>Error connecting to database...</h1>
    );
  }
}
