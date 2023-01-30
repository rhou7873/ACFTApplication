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
          <Link href="/scoring-scale">
              Scoring Scale
          </Link>
        </li>
        <li>
          <Link href="/results">
            Results
          </Link>
        </li>
        <li>
          <Link href="/about-us">
            About Us
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
