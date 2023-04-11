import React, { useState } from 'react';
import Link from 'next/link';
import { BottomNavigation, BottomNavigationAction, Button, ButtonGroup } from "@mui/material";
import { useRouter } from "next/router";

interface NavBarElement {
  title: string,
  route: string
}

interface NavBarProps {
  elements: NavBarElement[]
}

function NavBar(props: NavBarProps) {
  const [selected, setSelected] = useState(props.elements[0].title);

  const router = useRouter();

  return (
    <div className="navbar">
      {props.elements?.map(e => {
        return (
          <Button 
            sx={{ marginBottom: 5 }}
            key={e.title}
            variant={selected === e.title ? "contained" : "outlined"}
            onClick={() => { setSelected(e.title); router.push(e.route) }}>
              {e.title}
          </Button>
        )
      })}
    </div>
  );
}

export default NavBar;
