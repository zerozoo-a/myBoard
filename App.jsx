import React, { useState, useEffect } from 'react';
import AppRouter from './AppRouter';
import { authService } from './myBase';
import 'firebase/auth';
import Nav from './routes/Nav';
import DrawerMenu from './routes/DrawerMenu';
import { ThemeProvider } from 'styled-components';
import theme from './theme';

// redux
import store from './store/store';
import { setOnline, setOffline, selectIsOnline } from './store/userReducer';
import { useDispatch, useSelector } from 'react-redux';

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
    <div>
      <ThemeProvider theme={theme}>
        {isOnline && <DrawerMenu children={<Nav />} />}
        <AppRouter />
      </ThemeProvider>
    </div>
  );
};

export default App;
