import React, { useState } from 'react';
import { fireDB as db, fireStorage } from '../myBase';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/styles';
import IconButton from '@material-ui/core/IconButton';
import { Delete, Edit } from '@material-ui/icons';
import UploadImageBtn from './UploadImageBtn';
import styled from 'styled-components';

const useStyles = makeStyles(() => ({
  root: {
    '& > *': {
      margin: '0.5px',
    },
  },
  image: {
    '&': {
      width: '200px',
    },
  },
}));

export const DisplayThread = ({
  thread,
  userObj,
  isOwner,
  imageDownloadUrls,
  setImageDownloadUrls,
}) => {
  const [isEditOn, setIsEditOn] = useState(false);
  const [editThreadValue, setEditThreadValue] = useState(thread.data);
  const classes = useStyles();
  const imgAlt = 'user uploading image';

  const deleteThread = () => {
    const askDelete = window.confirm(
      'do you really want to delete this thread?'
    );
    if (askDelete) {
      db.collection('Thread').doc(thread.id).delete();
      if (thread.imageUrl === null) {
        return;
      }
      fireStorage.refFromURL(thread.imageUrl).delete();
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
    db.collection('Thread').doc(thread.id).update({
      data: editThreadValue,
      imageUrl: imageDownloadUrls,
      edited: Date.now(),
    });
    setIsEditOn(false);
  };
  return (
    <div>
      <div>
        {thread.imageUrl !== null ? (
          <img
            className={classes.image}
            alt={`${userObj}'s image`}
            src={thread.imageUrl}
          />
        ) : null}
        <div>{thread.data}</div>
      </div>
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

          {isEditOn ? (
            <>
              <form onSubmit={onSubmit}>
                <input
                  onChange={onChange}
                  type='text'
                  value={editThreadValue}
                />
                <div>
                  {imageDownloadUrls === undefined ? null : (
                    <div>
                      <img
                        className={classes.image}
                        alt={imgAlt}
                        src={imageDownloadUrls}
                      />
                    </div>
                  )}
                </div>

                <UploadImageBtn
                  setImageDownloadUrls={setImageDownloadUrls}
                  userObj={userObj}
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
