import React, { useState } from 'react';
import Drawer from '@material-ui/core/Drawer';
import { makeStyles } from '@material-ui/core';
import Button from '@material-ui/core/Button';

const drawerWidth = 240;
const useStyles = makeStyles({
  page: {
    background: '#f9f9f9',
    width: '100%',
  },
  drawer: {
    width: drawerWidth,
  },
  drawerPaper: {
    width: drawerWidth,
  },
});

export default function DrawerMenu({ children }) {
  const [drawerState, setDrawerState] = useState(false);
  const classes = useStyles();
  const toggleDrawer = (open) => (e) => {
    setDrawerState(open);
  };
  return (
    <div>
      <Button onClick={toggleDrawer(true)}>Open Drawer</Button>
      <Drawer
        anchor={'left'}
        open={drawerState}
        onClose={toggleDrawer(false)}
        classes={{ paper: classes.drawerPaper }}
        className={classes.drawer}>
        {children}
      </Drawer>
    </div>
  );
}
