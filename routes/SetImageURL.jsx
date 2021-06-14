import React from 'react';
import { AddAPhoto } from '@material-ui/icons';
import IconButton from '@material-ui/core/IconButton';
import ClearIcon from '@material-ui/icons/Clear';
import { authService, fireStorage } from '../myBase';
import { v4 as uuidv4 } from 'uuid';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { setURL } from '../store/imageReducer';
import { selectMode } from '../store/userReducer';
import { useSelector } from 'react-redux';

const SetImageURLContainer = styled.div`
  #HideInput {
    display: none;
  }
  #icon {
    color: ${(props) =>
      props.mode === 'dark'
        ? props.theme.colors.darkColor
        : props.theme.colors.lightColor};
  }
`;

export default React.memo(function SetImageURL() {
  const user = authService.currentUser;
  const dispatch = useDispatch();
  const mode = useSelector(selectMode);
  const imageToRead = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = async (e) => {
      const redImageURL = e.target.result; // input file
      const imageRef = fireStorage // find image reference from user.uid
        .ref()
        .child(`images/${user.uid}/${uuidv4()}`);
      const response = await imageRef.putString(redImageURL, 'data_url'); // upload string data to ref's data_url
      const imageDownloadURL = await response.ref.getDownloadURL();
      dispatch(setURL(imageDownloadURL));
    };
  };

  const onChange = (event) => {
    event.preventDefault();
    const file = event.target.files[0];
    imageToRead(file);
  };
  return (
    <SetImageURLContainer mode={mode}>
      <div>
        <div id='HideInput'>
          <input
            id='imageUpload'
            type='file'
            onChange={onChange}
            accept='image/*'
          />
        </div>
        <label htmlFor='imageUpload'>
          <IconButton id='icon' component='div'>
            <AddAPhoto />
          </IconButton>
        </label>
      </div>
    </SetImageURLContainer>
  );
});
