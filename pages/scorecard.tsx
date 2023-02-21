import React from 'react';
import NewSoldierForm from '../components/NewSoldierForm'
import NavBar from '../components/NavBar'
import RepCounter from '../components/RepCounter'
import { Card } from '@mui/material';
import Stopwatch from '../components/Stopwatch'

function scorecard() : JSX.Element{
return (
    <Card style = {{
        width: '80vw',
        height: '150vw',
        backgroundColor: 'lightblue',
    }}>
        <div>
            <RepCounter threshold={15}></RepCounter>
            <Stopwatch threshold={5}></Stopwatch>
            <Stopwatch threshold={5}></Stopwatch>
            <Stopwatch threshold={5}></Stopwatch>
            <Stopwatch threshold={5}></Stopwatch>
        </div>
    </Card>
);
}

export default scorecard;
  