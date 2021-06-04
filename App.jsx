import React, { useState, useEffect } from 'react';
import AppRouter from './AppRouter';
import { authService } from './myBase';
import 'firebase/auth';
import Nav from './routes/Nav';

// const auth = new firebase.auth.GoogleAuthProvider();

// userObj === now logged in user
const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userObj, setUserObj] = useState();
  useEffect(() => {
    authService.onAuthStateChanged((user) => {
      if (user) {
        setIsLoggedIn(true);
        setUserObj({
          displayName: user.displayName,
          uid: user.uid,
          photoUrl: user.photoURL,
          updateProfile: (args) => user.updateProfile(args),
        });
      } else {
        setIsLoggedIn(false);
      }
      return;
    });
  }, []);

  const userObjRefresh = () => {
    const user = authService.currentUser;
    setUserObj({
      displayName: user.displayName,
      uid: user.uid,
      updateProfile: (args) => user.updateProfile(args),
    });
  };

  return (
    <div>
      {isLoggedIn && userObj && <Nav userObj={userObj} />}
      <AppRouter
        setIsLoggedIn={setIsLoggedIn}
        isLoggedIn={isLoggedIn}
        userObj={userObj}
        userObjRefresh={userObjRefresh}
      />
    </div>
  );
};

export default App;
