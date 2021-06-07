import React, { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import styled from 'styled-components';
import ReturnImageUrl from './ReturnImageUrl';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import { fireStorage } from '../myBase';

const EditProfileNickName = ({ userObj, userObjRefresh }) => {
  const [newNickName, setNewNickName] = useState(userObj.displayName);

  const onChange = (event) => {
    setNewNickName(event.target.value);
  };
  const onSubmit = async (event) => {
    event.preventDefault();
    if (userObj.displayName !== newNickName) {
      await userObj.updateProfile({
        displayName: newNickName,
      });
      setNewNickName('');
      userObjRefresh();
    }
  };

  return (
    <div>
      <h3>Edit Profile</h3>
      <h4>
        👋 hello? <b>{userObj.displayName}</b>
        <form onSubmit={onSubmit}>
          <div>
            <label htmlFor='changeNickName'>change your nick name: </label>
          </div>
          <input
            value={newNickName}
            onChange={onChange}
            type='text'
            maxLength='20'
            required
            id='changeNickName'></input>
          <Button type='submit' id='submit' name='submit'>
            change
          </Button>
        </form>
      </h4>
    </div>
  );
};

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  img: {
    width: 150,
  },
}));

const EditProfileImage = ({ userObj, userObjRefresh }) => {
  const classes = useStyles();
  const [modalStyle] = useState(getModalStyle);
  const [open, setOpen] = useState(false);
  const [newProfileImage, setNewProfileImage] = useState(null);
  const userImageAlt = 'user image';

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const onSubmit = async (event) => {
    event.preventDefault();
    await userObj.updateProfile({
      photoURL: newProfileImage,
    });
    userObjRefresh();
    handleClose();
  };

  const body = (
    <div style={modalStyle} className={classes.paper}>
      <h2 id='simple-modal-title'>Text in a modal</h2>
      <img className={classes.img} alt={userImageAlt} src={userObj.photoUrl} />
      👉
      {newProfileImage && (
        <img className={classes.img} alt={userImageAlt} src={newProfileImage} />
      )}
      <form onSubmit={onSubmit}>
        <div>
          <ReturnImageUrl
            userObj={userObj}
            setNewProfileImage={setNewProfileImage}
          />
          <Button type='submit' id='changeUserImage'>
            Confirm
          </Button>
        </div>
      </form>
    </div>
  );

  return (
    <div>
      <button type='button' onClick={handleOpen}>
        Change your own your profile image
      </button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby='simple-modal-title'
        aria-describedby='simple-modal-description'>
        {body}
      </Modal>
    </div>
  );
};

const EditProfile = ({ userObj, userObjRefresh }) => {
  return (
    <>
      <EditProfileNickName userObj={userObj} userObjRefresh={userObjRefresh} />
      <EditProfileImage userObj={userObj} userObjRefresh={userObjRefresh} />
    </>
  );
};
export default EditProfile;
