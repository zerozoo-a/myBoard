import React, { useState, useEffect } from 'react';
import { AddAPhoto } from '@material-ui/icons';
import { makeStyles } from '@material-ui/styles';
import IconButton from '@material-ui/core/IconButton';
import ClearIcon from '@material-ui/icons/Clear';
import _, { cloneDeep } from 'lodash';
import { fireStorage } from '../myBase';

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
export default function UploadBtn() {
  const [imageFileUrl, setImageFileUrl] = useState([]);
  const classes = useStyles();

  const addImage = (event) => {
    event.preventDefault();
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = (e) => {
      setImageFileUrl((prev) => [...prev, e.target.result]);
    };
  };
  const exceptThisImage = (which) => {
    let newImageArray = _.cloneDeep(imageFileUrl);
    newImageArray.splice(which, 1);
    setImageFileUrl(newImageArray);
  };

  return (
    <>
      <div>
        {imageFileUrl
          ? imageFileUrl.map((image, i) => (
              <ol key={i + 'UploadImage'}>
                <li>
                  <img
                    className={classes.img}
                    alt='uploaded image'
                    src={image}
                  />
                  <div>
                    <IconButton onClick={() => exceptThisImage(i)}>
                      <ClearIcon />
                    </IconButton>
                  </div>
                </li>
              </ol>
            ))
          : null}
      </div>
      <input
        id='imageUpload'
        type='file'
        multiple
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
