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
  background-color:${(props) =>
    props.mode === 'dark'
      ? props.theme.colors.darkBackgroundColor
      : props.theme.colors.lightBackgroundColor};

      .MuiPaper-root{
        background-color:black;
      }
}
@media screen and (min-width: 1642px) {
#DuckIcon{
  margin-left:80%;

  
}
  }
@media screen and (max-width:${(props) => props.theme.deviceSizes.mobileL} ) {
#DuckIcon{
  margin-top:-20px;
  margin-left: 60vw;
 
}
  }


`;
const Menus = styled.div`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  top: 20%;

  @media screen and (max-width: ${(props) => props.theme.deviceSizes.tabletL}) {
    top: 7%;
    left: 25%;
  }
  @media screen and (max-width: ${(props) => props.theme.deviceSizes.mobileL}) {
    top: 5%;
    left: 5%;
    flex-direction: row;
    align-items: center;
    height: 48px;
    #ModeContainer {
      transform: rotate(0deg);
      margin: 0;
    }
  }
  @media screen and (min-width: 1642px) {
    top: 10%;
    left: 80%;
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
            <div id='DuckIcon'>
              <Router>
                <Link to='/' replace>
                  <div>
                    <DuckIcon />
                  </div>
                </Link>
              </Router>
            </div>
            <Menus>
              <DrawerMenu
                onClick={() => setIsOpen(!isOpen)}
                children={<Nav />}
              />
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
