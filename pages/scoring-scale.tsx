import { useState, useEffect } from "react";

interface ScoreScale {
    id: number
}

export default function ScoringScale() {
    const [scoring, setScoring] = useState<ScoreScale[]>([]);
    const [mdlScoring, setMdlScoring] = useState<ScoreScale>({});
    const [sptScoring, setSptScoring] = useState<ScoreScale>({});
    const [hrpScoring, setHrpScoring] = useState<ScoreScale>({});
    const [sdcScoring, setSdcScoring] = useState<ScoreScale>({});
    const [plkScoring, setPlkScoring] = useState<ScoreScale>({});
    const [tmrScoring, setTmrScoring] = useState<ScoreScale>({});

    useEffect(() => {
        fetch("./api/scoring-scale", { method: "GET" })
            .then(res => res.json())
            .then(json => {
                setScoring(json);
            });
    }, []);
    
    return (
        <>
            {scoring.forEach(scoringScale => {
                return <p>{scoringScale}</p>
            })}
        </>
    );
}