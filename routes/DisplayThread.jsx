import React, { useState } from 'react';
import { authService, fireDB as db, fireStorage } from '../myBase';
// import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import { Delete, Edit } from '@material-ui/icons';
import UploadImageBtn from './UploadImageBtn';
import styled from 'styled-components';
import { selectMode } from '../store/userReducer';
import { useSelector } from 'react-redux';

const ThreadStyle = styled.div`
  #threadUserPhotoAndThreadInfo {
    display: flex;
  }
  img:not(#userPhoto) {
    width: 40vw;
  }
  #threadUserPhotoUrl {
    img {
      width: 3rem;
      border-radius: 50%;
    }
  }
  #threadInfo {
    width: 50vw;
    margin-left: ${(props) => props.theme.margins.base};
    padding-left: ${(props) => props.theme.margins.base};
    border: 2px solid
      ${(props) =>
        props.mode === 'dark'
          ? (props) => props.theme.colors.darkBorderColor
          : props.theme.colors.lightBorderColor};
    background-color: ${(props) =>
      props.mode === 'dark'
        ? props.theme.colors.darkBackgroundColor
        : props.theme.colors.lightBackgroundColor};

    color: ${(props) =>
      props.mode === 'dark'
        ? props.theme.colors.darkColor
        : props.theme.colors.lightColor};
    border-radius: 3px;
  }
`;
const IsOwner = styled.div`
  #deleteIcon {
    color: ${(props) =>
      props.mode === 'dark'
        ? props.theme.colors.darkColor
        : props.theme.colors.lightColor};
  }
  #editIcon {
    color: ${(props) =>
      props.mode === 'dark'
        ? props.theme.colors.darkColor
        : props.theme.colors.lightColor};
  }
  #uploadImageBtnAndSubmitBtn {
    display: flex;
  }
`;

const DisplayThread = React.memo(
  ({
    thread,
    isOwner,
    imageDownloadUrls,
    setImageDownloadUrls,
    QuackInput,
    SubmitBtn,
  }) => {
    const [isEditOn, setIsEditOn] = useState(false);
    const [editThreadValue, setEditThreadValue] = useState(thread.data);
    const imgAlt = 'user uploading image';
    const user = authService.currentUser;
    const mode = useSelector(selectMode);

    const deleteThread = () => {
      const askDelete = window.confirm('해당 thread를 정말로 삭제하시겠어요?');
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
      db.collection('Thread')
        .doc(thread.id)
        .update({
          data: editThreadValue,
          imageUrl: imageDownloadUrls === undefined ? null : imageDownloadUrls,
          edited: Date.now(),
        });
      setIsEditOn(false);
    };
    return (
      <div>
        <ThreadStyle mode={mode}>
          {thread.imageUrl !== null ? (
            <img alt={`${user.displayName}'s image`} src={thread.imageUrl} />
          ) : null}
          <div id='threadUserPhotoAndThreadInfo'>
            <div id='threadUserPhotoUrl'>
              <img id='userPhoto' alt={'user photo'} src={thread.photoUrl} />
            </div>
            <div id='threadInfo'>
              <div id='threadData'>{thread.data}</div>
              <div id='threadCreatedAt'>{thread.createdAt}</div>
              <div id='threadUser'>{thread.user}</div>
            </div>
          </div>
        </ThreadStyle>
        {isOwner ? (
          <IsOwner mode={mode}>
            <IconButton
              id='deleteIcon'
              onClick={deleteThread}
              aria-label='delete'>
              <Delete />
            </IconButton>
            {isEditOn ? (
              <>
                <IconButton
                  color='secondary'
                  onClick={editThread}
                  aria-label='edit'>
                  <Edit />
                </IconButton>
              </>
            ) : (
              <>
                <IconButton
                  id='editIcon'
                  onClick={editThread}
                  aria-label='edit'>
                  <Edit />
                </IconButton>
              </>
            )}

            {isEditOn ? (
              <>
                <form onSubmit={onSubmit}>
                  <QuackInput
                    onChange={onChange}
                    type='text'
                    // value={editThreadValue}
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

                  <div id='uploadImageBtnAndSubmitBtn'>
                    <UploadImageBtn
                      setImageDownloadUrls={setImageDownloadUrls}
                    />
                    <SubmitBtn type='submit' size='small'>
                      수정하기
                    </SubmitBtn>
                  </div>
                </form>
              </>
            ) : null}
          </IsOwner>
        ) : null}
      </div>
    );
  }
);

export default DisplayThread;
