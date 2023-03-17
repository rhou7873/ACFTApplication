import React, { useEffect, useState } from 'react'

function LiveScore() {
    const [score, setScore] = useState(0);

    useEffect(() => {
        fetch()
    }, [])

    return (
        <div>LiveScore</div>
    )
}

export default LiveScore