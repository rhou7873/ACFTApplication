import { useState, useEffect } from "react";

interface ScoreScale {
    id: number
}

export default function ScoringScale() {
    const [scoring, setScoring] = useState<ScoreScale[]>([]);
    const [mdlScoring, setMdlScoring] = useState<ScoreScale>({} as ScoreScale);
    const [sptScoring, setSptScoring] = useState<ScoreScale>({} as ScoreScale);
    const [hrpScoring, setHrpScoring] = useState<ScoreScale>({} as ScoreScale);
    const [sdcScoring, setSdcScoring] = useState<ScoreScale>({} as ScoreScale);
    const [plkScoring, setPlkScoring] = useState<ScoreScale>({} as ScoreScale);
    const [tmrScoring, setTmrScoring] = useState<ScoreScale>({} as ScoreScale);

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