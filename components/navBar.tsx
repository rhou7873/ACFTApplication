import React from 'react';
import Link from 'next/link';

function NavBar() {
  return (
    <nav>
      <ul>
        <li>
          <Link href="/">
            Home
          </Link>
        </li>
        <li>
          <Link href="/results">
            Results
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default NavBar;
