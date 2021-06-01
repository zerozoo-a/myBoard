import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import { authService } from './myBase';
import Auth from './routes/Auth';
import Home from './routes/Home';

const AppRouter = ({ isLoggedIn }) => {
  return (
    <Router>
      <Switch>
        {isLoggedIn ? (
          <>
            <Route exact path='/'>
              <Home />
            </Route>
          </>
        ) : (
          <>
            <Route exact path='/'>
              <Auth />
            </Route>
          </>
        )}
      </Switch>
    </Router>
  );
};
export default AppRouter;
