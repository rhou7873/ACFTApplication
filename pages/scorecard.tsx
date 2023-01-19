import React from 'react';
import SoldierForm from '../components/soldierForm'
import NavBar from '../components/navBar'

function Navbar() : JSX.Element{
return (
    <div>
        <NavBar></NavBar>
        <h1>ACFT Scorecard</h1>
        <SoldierForm></SoldierForm>
    </div>
);
}

export default Navbar;
  