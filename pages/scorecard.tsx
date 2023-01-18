import React from 'react';
import SoldierForm from '../react_components/soldier_form'
import NavBar from '../react_components/nav_bar'


function Navbar(){
return (
    <div>
        <NavBar></NavBar>
        <h1>ACFT Scorecard</h1>
        <SoldierForm></SoldierForm>
    </div>
);
}

export default Navbar;
  