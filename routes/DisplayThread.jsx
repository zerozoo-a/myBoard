import React from 'react';
import { Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';

const useStyles = makeStyles(() => ({
  root: {
    '& > *': {
      margin: '0.5px',
    },
  },
}));

export const DisplayThread = ({ thread, userObj, isOwner }) => {
  const classes = useStyles();
  console.log('isOwner: ', isOwner);
  return (
    <div>
      <div>
        <span></span>
        {thread.data}
      </div>
      {isOwner ? (
        <div>
          <IconButton className={classes.root} aria-label='delete'>
            <DeleteIcon size='small' />
          </IconButton>
          <IconButton className={classes.root} aria-label='delete'>
            <EditIcon size='small' />
          </IconButton>
        </div>
      ) : null}
    </div>
  );
};
