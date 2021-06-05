import React from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import Auth from './routes/Auth';
import Home from './routes/Home';
import Profile from './routes/Profile';

const AppRouter = ({ setIsLoggedIn, isLoggedIn, userObj, userObjRefresh }) => {
  return (
    <Router>
      <Switch>
        {isLoggedIn ? (
          <>
            <Route exact path='/'>
              <Home userObj={userObj} />
            </Route>
          </>
        ) : (
          <>
            <Route exact path='/'>
              <Auth setIsLoggedIn={setIsLoggedIn} />
            </Route>
          </>
        )}
      </Switch>
      <Route exact path='/Profile'>
        {isLoggedIn && userObj && (
          <Profile
            isLoggedIn={isLoggedIn}
            userObj={userObj}
            userObjRefresh={userObjRefresh}
          />
        )}
      </Route>
    </Router>
  );
};
export default AppRouter;
