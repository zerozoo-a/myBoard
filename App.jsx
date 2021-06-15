import React, { useState, useEffect } from 'react';
import AppRouter from './AppRouter';
import { authService } from './myBase';
import 'firebase/auth';
import Nav from './routes/Nav';
import DrawerMenu from './routes/DrawerMenu';
import styled, { ThemeProvider, createGlobalStyle } from 'styled-components';
import theme from './theme';
import Mode from './routes/Mode';
import DuckIcon from './routes/design/DuckIcon';
import { Link, HashRouter as Router } from 'react-router-dom';

// redux
import {
  setOnline,
  setOffline,
  selectIsOnline,
  selectMode,
} from './store/userReducer';
import { useDispatch, useSelector } from 'react-redux';

const GlobalStyle = createGlobalStyle`
*, *::before, *::after{
  box-sizing:border-box;
  list-style: none;
  margin:0;
  padding:0;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
}
body{
  display:grid;
  place-items:center;
  margin-top:3rem;
  background-color:${(props) =>
    props.mode === 'dark'
      ? props.theme.colors.darkBackgroundColor
      : props.theme.colors.lightBackgroundColor};
}
`;
const Menus = styled.div`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  top: 18%;
  #DrawerMenu {
    height: 42px;
  }

  @media screen and (max-width: ${(props) => props.theme.deviceSizes.tabletL}) {
    position: fixed;
    flex-direction: column;
    align-items: center;
    top: 25%;
    left: -5%;
    #ModeContainer {
      transform: rotate(90deg);
      margin-top: 1rem;
    }
  }
  @media screen and (max-width: ${(props) => props.theme.deviceSizes.mobileS}) {
    top: 25%;
    left: -5%;
  }
`;

const App = () => {
  let isOnline = useSelector(selectIsOnline);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();
  const mode = useSelector(selectMode);
  useEffect(() => {
    authService.onAuthStateChanged((user) => {
      if (user) {
        setIsLoggedIn(true);
        dispatch(setOnline());
      } else {
        setIsLoggedIn(false);
        dispatch(setOffline());
      }
      return;
    });
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle mode={mode} />
      <span>
        {isOnline && (
          <div>
            <Router>
              <Link to='/' replace>
                <DuckIcon id='DuckIcon' />
              </Link>
            </Router>
            <Menus>
              <div id='DrawerMenu'>
                <DrawerMenu
                  onClick={() => setIsOpen(!isOpen)}
                  children={<Nav />}
                />
              </div>
              <div id='ModeContainer'>{isOnline && <Mode />}</div>
            </Menus>
          </div>
        )}
      </span>
      <AppRouter />
    </ThemeProvider>
  );
};

export default App;
