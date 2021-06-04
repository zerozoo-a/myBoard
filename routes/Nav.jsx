import React from 'react';
import { HashRouter as Router, Link } from 'react-router-dom';

export default function Nav({ userObj }) {
  return (
    <Router>
      <div>
        <ul>
          <li>
            <Link to='/'>Home</Link>
          </li>
          <li>
            <Link to='/Profile'>
              {userObj === undefined ? null : userObj.displayName}'s Profile
            </Link>
          </li>
          <li>
            <Link to='/About'>About</Link>
          </li>
        </ul>
      </div>
    </Router>
  );
}
