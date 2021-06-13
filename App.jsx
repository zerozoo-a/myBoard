import React, { useState, useEffect } from 'react';

import AppRouter from './AppRouter';
import { authService } from './myBase';
import 'firebase/auth';
import Nav from './routes/Nav';
import DrawerMenu from './routes/DrawerMenu';
import { ThemeProvider } from 'styled-components';
import theme from './theme';
import { createGlobalStyle } from 'styled-components';

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
      : props.theme.colors.lightBackgroundColor}
}
`;

const App = () => {
  let isOnline = useSelector(selectIsOnline);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
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
      {isOnline && <DrawerMenu children={<Nav />} />}
      <AppRouter />
    </ThemeProvider>
  );
};

export default App;
