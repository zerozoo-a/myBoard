import React, { useState, useEffect } from 'react';
import AppRouter from './AppRouter';
import { authService } from './myBase';
import 'firebase/auth';

// const auth = new firebase.auth.GoogleAuthProvider();

// userObj === now logged in user
const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userObj, setUserObj] = useState(null);
  useEffect(() => {
    authService.onAuthStateChanged((user) => {
      if (user) {
        setIsLoggedIn(true);
        setUserObj(user);
      } else {
        setIsLoggedIn(false);
      }
      return;
    });
  }, []);
  return (
    <div>
      <AppRouter
        setIsLoggedIn={setIsLoggedIn}
        isLoggedIn={isLoggedIn}
        userObj={userObj}
      />
    </div>
  );
};

export default App;
