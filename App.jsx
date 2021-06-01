import React, { useState, useEffect } from 'react';
import AppRouter from './AppRouter';
import { authService } from './myBase';
import 'firebase/auth';

// const auth = new firebase.auth.GoogleAuthProvider();

console.log('firebase: ', authService);
const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    authService.onAuthStateChanged((user) => {
      if (user) {
        isLoggedIn(true);
      }
      return;
    });
  }, []);
  return (
    <div>
      <AppRouter isLoggedIn={isLoggedIn} />
    </div>
  );
};

export default App;
