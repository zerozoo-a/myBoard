import React from 'react';
import { HashRouter as Router, Link } from 'react-router-dom';
import LogOutBtn from './LogOutBtn';
import styled from 'styled-components';
import { authService } from '../myBase';
import { useSelector } from 'react-redux';
import { selectIsOnline } from '../store/userReducer';
import { selectMode } from '../store/userReducer';
import { motion } from 'framer-motion';

const NavStyle = styled.div`
  background-color: ${(props) =>
    props.mode === 'dark'
      ? props.theme.colors.darkBackgroundColor
      : props.theme.colors.lightBackgroundColor};
  height: 100vh;
  ul {
    padding: 0;
    margin: 0;
  }
  li {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 3rem;
    background-color: ${(props) => props.theme.colors.pointColor};
    color: ${(props) =>
      props.mode === 'dark'
        ? props.theme.colors.darkColor
        : props.theme.colors.lightColor};

    border-radius: 0.5rem;
    list-style: none;
    margin: 1.5rem;
    font-size: 1rem;
    text-align: center;
    width: 20rem;
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

export default function Nav() {
  const user = authService.currentUser;
  let isOnline = useSelector(selectIsOnline);
  const mode = useSelector(selectMode);
  return (
    <>
      {isOnline && (
        <Router>
          <NavStyle mode={mode}>
            <ul>
              <motion.div whileHover={{ scale: 1.0 }} whileTap={{ scale: 0.9 }}>
                <li>
                  <Link to='/' replace>
                    Home
                  </Link>
                </li>
              </motion.div>

              <motion.div whileHover={{ scale: 1.0 }} whileTap={{ scale: 0.9 }}>
                <li>
                  <Link to='/Profile' replace>
                    {isOnline ? user.displayName : ''}의 정보
                  </Link>
                </li>
              </motion.div>
              <motion.div whileHover={{ scale: 1.0 }} whileTap={{ scale: 0.9 }}>
                <li>
                  <Link to='/About' replace>
                    About
                  </Link>
                </li>
              </motion.div>
              <div>
                <motion.div
                  whileHover={{ scale: 1.0 }}
                  whileTap={{ scale: 0.9 }}>
                  <LogOutBtn />
                </motion.div>
              </div>
            </ul>
          </NavStyle>
        </Router>
      )}
    </>
  );
}
