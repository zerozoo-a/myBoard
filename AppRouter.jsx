import React from 'react';
import { HashRouter as BrowserRouter, Route, Switch } from 'react-router-dom';
import Auth from './routes/Auth';
import Home from './routes/Home';
import Profile from './routes/Profile';

const AppRouter = ({ setIsLoggedIn, isLoggedIn, userObj, userObjRefresh }) => {
  return (
    <BrowserRouter>
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
      <Switch>
        <Route path='/Profile'>
          {isLoggedIn && userObj && (
            <Profile
              isLoggedIn={isLoggedIn}
              userObj={userObj}
              userObjRefresh={userObjRefresh}
            />
          )}
        </Route>
        <Route path='/'>Not Found</Route>
      </Switch>
    </BrowserRouter>
  );
};
export default AppRouter;
