import React, { useState } from 'react';
import { Button } from '@mui/material';

export default function RepCounter(props : any) {
  const [count, setCount] = useState(0);
  const [color, setColor] : any = useState('error');

  function handleClick() {
    // Use updater function when new state is derived from old
    setCount(count + 1);
    if (count >= props.threshold - 1){
      setColor('success');
    }
  };

  return (
    <Button style={{ width: "100px", height: "100px", fontSize : "30px"}} variant="contained" onClick={handleClick} color={color}>{count}</Button>
  );
}
