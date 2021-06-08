import React from 'react';
import Button from '@material-ui/core/Button';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/styles';
import { authService } from '../myBase';

import { setOffline } from '../store/userReducer';
import { useDispatch } from 'react-redux';
const useStyles = makeStyles((theme) => ({
  root: {},
}));
export default function LogOutBtn() {
  const dispatch = useDispatch();
  let history = useHistory();

  const logOut = () => {
    dispatch(setOffline());
    authService.signOut();
    history.push('/');
  };
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Button onClick={logOut} color='secondary'>
        로그아웃
      </Button>
    </div>
  );
}
