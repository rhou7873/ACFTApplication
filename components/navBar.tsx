import React from 'react';
import Link from 'next/link';

function Navbar(){
  return (
    <nav>
      <ul>
        <li>
          <Link href="/">
            Home
          </Link>
        </li>
        <li>
          <Link href="/scorecard">
            Scorecard
          </Link>
        </li>
        <li>
          <Link href="/results">
            Results
          </Link>
        </li>
        <li>
          <Link href="/aboutUs">
            About Us
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
