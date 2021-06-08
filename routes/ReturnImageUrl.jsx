import React from 'react';
import { IconButton } from '@material-ui/core';
import { AddAPhoto } from '@material-ui/icons';
import styled from 'styled-components';
import { v4 as uuidv4 } from 'uuid';
import { authService, fireStorage } from '../myBase';

const HideInput = styled.div`
  display: none;
`;

export default function ReturnImageUrl({ setNewProfileImage }) {
  const user = authService.currentUser;
  const imageToRead = (file, setter) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = async (e) => {
      const redImageUrl = e.target.result;
      const imageRef = fireStorage
        .ref()
        .child(`images/${user.uid}/${uuidv4()}/`);
      const response = await imageRef.putString(redImageUrl, 'data_url');
      const imageDownloadUrl = await response.ref.getDownloadURL();
      setter(imageDownloadUrl);
    };
  };

  const addImage = (event) => {
    event.preventDefault();
    const file = event.target.files[0];
    imageToRead(file, setNewProfileImage);
  };
  return (
    <>
      <div>
        <HideInput>
          <input
            id='imageUpload'
            type='file'
            onChange={addImage}
            accept='image/*'></input>
        </HideInput>
        <label htmlFor='imageUpload'>
          <IconButton component='div'>
            <AddAPhoto />
          </IconButton>
        </label>
      </div>
    </>
  );
}
