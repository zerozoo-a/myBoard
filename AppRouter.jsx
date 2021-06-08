import React from 'react';
import { HashRouter as BrowserRouter, Route, Switch } from 'react-router-dom';
import Auth from './routes/Auth';
import Home from './routes/Home';
import Profile from './routes/Profile';

// redux
import store from './store/store';
import { selectIsOnline } from './store/userReducer';
import { useSelector } from 'react-redux';

const AppRouter = ({ setIsLoggedIn, isLoggedIn }) => {
  let isOnline = useSelector(selectIsOnline);
  // let isOnline = store.getState().user.isOnline;
  // console.log(isOnline);
  return (
    <BrowserRouter>
      <Switch>
        {/* {isLoggedIn ? ( */}
        {isOnline ? (
          <>
            <Switch>
              <Route exact path='/'>
                <Home />
              </Route>
              <Route exact path='/Profile'>
                {isLoggedIn && <Profile />}
              </Route>
              <Route path='/'>
                <h1>404 Not Found</h1>
              </Route>
            </Switch>
          </>
        ) : (
          <>
            <Switch>
              <Route exact path='/'>
                <Auth isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
              </Route>
              <Route path='/'>
                <h1>404 Not Found</h1>
              </Route>
            </Switch>
          </>
        )}
      </Switch>
    </BrowserRouter>
  );
};
export default AppRouter;
