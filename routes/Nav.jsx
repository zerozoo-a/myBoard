import React from 'react';
import { HashRouter as Router, Link } from 'react-router-dom';
import LogOutBtn from './LogOutBtn';
import styled from 'styled-components';

const NavStyle = styled.div`
  ul {
    padding: 0;
    margin: 0;
  }
  li {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 3rem;
    background-color: ${({ theme }) => theme.colors.lightBlue500};
    border-radius: 0.5rem;
    list-style: none;
    margin: 0.5rem;
    font-size: 1rem;
    text-align: center;
  }
  a {
    display: flex;
    justify-content: center;
    align-items: center;
    text-decoration: none;
    width: 100%;
    height: 100%;
    color: ${({ theme }) => theme.colors.white};
  }
  div {
    display: flex;
    justify-content: center;
    align-items: center;
    text-decoration: none;
    width: 100%;
    height: 100%;
    cursor: pointer;
  }
`;

export default function Nav({ userObj }) {
  return (
    <Router>
      <NavStyle>
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
          <div>
            <LogOutBtn userObj={userObj} />
          </div>
        </ul>
      </NavStyle>
    </Router>
  );
}
