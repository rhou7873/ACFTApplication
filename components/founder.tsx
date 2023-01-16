import type { InferGetStaticPropsType, GetStaticProps } from "next";
import { AppProps } from "next/app";

type Props = {
    founder: FounderType
}

export type FounderType = {
    first_name: string, 
    last_name: string,
    email: string
}

function Founder({ founder }: Props) {
    return (
        <>
            <h1>{founder.first_name} {founder.last_name}</h1>
            <h3>Email: {founder.email}</h3>
        </>
    )
}

export default Founder