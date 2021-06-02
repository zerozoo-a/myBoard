import React from 'react';
import Button from '@material-ui/core/Button';
import { useHistory } from 'react-router';
import { makeStyles } from '@material-ui/styles';
import { authService } from '../myBase';
const useStyles = makeStyles((theme) => ({
  root: {},
}));
export default function LogOutBtn() {
  const logOut = () => {
    console.log(history);
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