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
import store from './store/store';
import { setOnline, setOffline, selectIsOnline } from './store/userReducer';
import { useDispatch, useSelector } from 'react-redux';

const GlobalStyle = createGlobalStyle`
*, *::before, *::after{
  box-sizing:border-box;
}
body{
  margin:0;
}
canvas{
  ${
    '' /* display:block;
  position:fixed;
  width:100%;
  height:100%;
  left:0;
  top:0;
  z-index: 0; */
  }
}
`;

const App = () => {
  let isOnline = useSelector(selectIsOnline);
  const dispatch = useDispatch();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    authService.onAuthStateChanged((user) => {
      if (user) {
        setIsLoggedIn(true);
        dispatch(setOnline());
      } else {
        setIsLoggedIn(false);
        dispatch(setOffline());
        console.log('clicked logOutBtn isOnline:', isOnline);
      }
      return;
    });
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      {isOnline && <DrawerMenu children={<Nav />} />}
      <AppRouter />
    </ThemeProvider>
  );
};

export default App;
