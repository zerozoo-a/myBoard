import React, { useState, useEffect } from 'react';
import { AddAPhoto } from '@material-ui/icons';
import { makeStyles } from '@material-ui/styles';
import IconButton from '@material-ui/core/IconButton';
import ClearIcon from '@material-ui/icons/Clear';
import { cloneDeep } from 'lodash';
import { fireStorage } from '../myBase';
import { v4 as uuidv4 } from 'uuid';

const useStyles = makeStyles(() => ({
  root: {
    '& > *': {
      margin: '0.5px',
    },
  },
  input: {
    '& ': {
      display: 'none',
    },
  },
  img: {
    '&': {
      width: '150px',
    },
  },
}));

export default function UploadImageBtn({
  imageFileUrls,
  imageDownloadUrls,
  setImageFileUrls,
  setImageDownloadUrls,
  userObj,
}) {
  const [previewImage, setPreviewImage] = useState(undefined);
  const classes = useStyles();
  const normalAlt = 'this is user image';

  const imageToRead = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = async (e) => {
      const imageUrl = e.target.result;
      const imageRef = fireStorage
        .ref()
        .child(`${userObj.uid}/${uuidv4()}/image`);
      const response = await imageRef.putString(imageUrl, 'data_url');
      const imageDownloadUrl = await response.ref.getDownloadURL();
      setImageDownloadUrls(imageDownloadUrl);
      setPreviewImage(imageDownloadUrl);
    };
  };

  const addImage = (event) => {
    event.preventDefault();
    const file = event.target.files[0];
    imageToRead(file);
  };
  const exceptThisImage = (which) => {
    let newImageArray = cloneDeep(imageFileUrls);
    newImageArray.splice(which, 1);
    setImageFileUrls(newImageArray);
  };

  return (
    <>
      <div>
        {previewImage === undefined ? null : (
          <div>
            <img
              className={classes.img}
              alt={normalAlt}
              src={imageDownloadUrls}
            />
          </div>
        )}
      </div>
      <input
        id='imageUpload'
        type='file'
        onChange={addImage}
        accept='image/*'
        className={classes.input}></input>
      <label htmlFor='imageUpload'>
        <IconButton component='div'>
          <AddAPhoto />
        </IconButton>
      </label>
    </>
  );
}
