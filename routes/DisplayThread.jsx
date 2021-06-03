import React, { useState } from 'react';
import { fireDB as db } from '../myBase';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/styles';
import IconButton from '@material-ui/core/IconButton';
import { Delete, Edit, AddAPhoto } from '@material-ui/icons';

import UploadBtn from './UploadBtn';

const useStyles = makeStyles(() => ({
  root: {
    '& > *': {
      margin: '0.5px',
    },
  },
}));

export const DisplayThread = ({ thread, userObj, isOwner }) => {
  const [isEditOn, setIsEditOn] = useState(false);
  const [editThreadValue, setEditThreadValue] = useState(thread.data);
  const classes = useStyles();

  const deleteThread = () => {
    const askDelete = window.confirm(
      'do you really want to delete this thread?'
    );
    if (askDelete) {
      db.collection('Thread').doc(thread.id).delete();
    }
  };

  const editThread = () => {
    setIsEditOn(!isEditOn);
  };

  const onChange = (event) => {
    setEditThreadValue(event.target.value);
  };

  const onSubmit = (event) => {
    event.preventDefault();
    db.collection('Thread').doc(thread.id).update({ data: editThreadValue });
  };
  return (
    <div>
      <div>{thread.data}</div>
      {isOwner ? (
        <div>
          <IconButton
            onClick={deleteThread}
            className={classes.root}
            aria-label='delete'>
            <Delete />
          </IconButton>
          {isEditOn ? (
            <>
              <IconButton
                color='secondary'
                onClick={editThread}
                className={classes.root}
                aria-label='edit'>
                <Edit />
              </IconButton>
            </>
          ) : (
            <>
              <IconButton
                onClick={editThread}
                className={classes.root}
                aria-label='edit'>
                <Edit />
              </IconButton>
            </>
          )}
          <UploadBtn />

          {isEditOn ? (
            <>
              <form onSubmit={onSubmit}>
                <input
                  onChange={onChange}
                  type='text'
                  value={editThreadValue}
                />
                <Button type='submit' size='small'>
                  commit
                </Button>
              </form>
            </>
          ) : null}
        </div>
      ) : null}
    </div>
  );
};
