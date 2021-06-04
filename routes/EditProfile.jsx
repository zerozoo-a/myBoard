import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import UploadImageBtn from './UploadImageBtn';
import styled from 'styled-components';
import { PhotoAlbum } from '@material-ui/icons';

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
            maxLength='8'
            id='changeNickName'></input>
          <Button type='submit' id='submit' name='submit'>
            change
          </Button>
        </form>
      </h4>
    </div>
  );
};

const EditUserProfileUrlStyle = styled.div`
  img {
    width: 150px;
  }
`;
const EditProfilePhotoURL = ({ userObj, userObjRefresh }) => {
  const [newProfilePhoto, setNewProfilePhoto] = useState();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const userPhotoUrlAlt = 'this is user photo 🖼';
  const onSubmit = async (event) => {
    event.preventDefault();
    if (userObj.photoUrl !== newProfilePhoto) {
      await userObj.updateProfile({ photoUrl: newProfilePhoto });
      console.log('is it works?');
      setIsSubmitted(!isSubmitted);
      setNewProfilePhoto();
      userObjRefresh();
    }
  };

  return (
    <>
      <div>
        <div>you can change your photo</div>
      </div>
      <EditUserProfileUrlStyle>
        {isSubmitted ? (
          <img alt={userPhotoUrlAlt} src={newProfilePhoto} />
        ) : (
          <img alt={userPhotoUrlAlt} src={userObj.photoUrl} />
        )}
        <span> from </span>
        <span> to </span>

        {newProfilePhoto && <img alt={userPhotoUrlAlt} src={newProfilePhoto} />}
      </EditUserProfileUrlStyle>
      <UploadImageBtn
        userObj={userObj}
        setNewProfilePhoto={setNewProfilePhoto}
      />
      <form onSubmit={onSubmit}>
        {newProfilePhoto && (
          <Button type='submit' name='submit' id='submit'>
            CHANGE
          </Button>
        )}
      </form>
    </>
  );
};

const EditProfile = ({ userObj, userObjRefresh }) => {
  return (
    <>
      <EditProfileNickName userObj={userObj} userObjRefresh={userObjRefresh} />
      <EditProfilePhotoURL userObj={userObj} userObjRefresh={userObjRefresh} />
    </>
  );
};
export default EditProfile;
