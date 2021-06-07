import React, { useState, useEffect } from 'react';
import { AddAPhoto } from '@material-ui/icons';
import { makeStyles } from '@material-ui/styles';
import IconButton from '@material-ui/core/IconButton';
import ClearIcon from '@material-ui/icons/Clear';
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
  imageDownloadUrls,
  setImageDownloadUrls,
  userObj,
  setNewProfileImage,
}) {
  const [previewImage, setPreviewImage] = useState(undefined);
  const classes = useStyles();
  const normalAlt = 'this is user image';

  const imageToRead = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = async (e) => {
      const redImageUrl = e.target.result;
      const imageRef = fireStorage
        .ref()
        .child(`images/${userObj.uid}/${uuidv4()}/`);
      const response = await imageRef.putString(redImageUrl, 'data_url');
      const imageDownloadUrl = await response.ref.getDownloadURL();
      setPreviewImage(imageDownloadUrl);

      if (setNewProfileImage === undefined) {
        setImageDownloadUrls(imageDownloadUrl);
        return;
      } else {
        setNewProfilePhoto(imageDownloadUrl);
      }
    };
  };
  useEffect(() => {
    if (imageDownloadUrls === undefined) {
      setPreviewImage(undefined);
    }
  }, [imageDownloadUrls]);

  const addImage = (event) => {
    event.preventDefault();
    const file = event.target.files[0];
    imageToRead(file);
  };
  const exceptThisImage = () => {
    if (setNewProfilePhoto === undefined) {
      setImageDownloadUrls('');
    } else {
      setNewProfilePhoto(undefined);
      setPreviewImage(undefined);
    }
  };

  return (
    <div>
      <div>
        {previewImage === undefined ? null : (
          <div>
            <img className={classes.img} alt={normalAlt} src={previewImage} />
            <IconButton onClick={exceptThisImage}>
              <ClearIcon />
            </IconButton>
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
    </div>
  );
}
