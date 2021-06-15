import React, { useState, useEffect } from 'react';
import { authService, fireDB as db, fireDB, fireStorage } from '../myBase';
import IconButton from '@material-ui/core/IconButton';
import { Delete, Edit } from '@material-ui/icons';
import styled from 'styled-components';
import { selectMode } from '../store/userReducer';
import { selectURL, setURL } from '../store/imageReducer';
import { selectEdit, setEdit } from '../store/editReducer';
import { useSelector, useDispatch } from 'react-redux';
import SetImageURL from './SetImageURL';
import ImageModal from './ImageModal';

const DisplayThreadContainer = styled.div`
  margin: 3rem;
  padding: 1rem;
  border-bottom: 1px solid
    ${(props) =>
      props.mode === 'dark'
        ? props.theme.colors.darkBorderColor
        : props.theme.colors.lightBorderColor};
`;
const ThreadStyle = styled.div`
  #threadUserPhotoAndThreadInfo {
    display: flex;
  }
  img {
    cursor: pointer;
  }
  img:not(#userPhoto, #modalImg) {
    width: 20vw;
    margin-bottom: 2rem;
  }
  #threadData {
    padding: 0.5rem 0 2rem 0;
  }
  #threadUserPhotoUrl {
    img {
      width: 3rem;
      height: 3rem;
      border-radius: 50%;
    }
  }
  #threadInfo {
    width: 45vw;
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
  #setImageBtnAndSubmitBtn {
    img {
      width: 10rem;
    }
  }
`;

const DisplayThread = React.memo(
  ({ thread, isOwner, imageDownloadUrls, QuackInput, SubmitBtn }) => {
    const [isEditOn, setIsEditOn] = useState(false);
    const [editThreadValue, setEditThreadValue] = useState(thread.data);
    const [isImageClicked, setIsImageClicked] = useState(false);
    const imgAlt = 'user uploading image';
    const user = authService.currentUser;
    const mode = useSelector(selectMode);
    const URL = useSelector(selectURL);
    const edit = useSelector(selectEdit);
    const dispatch = useDispatch();

    useEffect(() => {
      if (!edit && isEditOn) setIsEditOn(false);
    }, [edit]);

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
      dispatch(setEdit());
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
          imageURL: URL === null ? null : URL,
          edited: Date.now(),
        });
      dispatch(setURL(null));
      setIsEditOn(false);
    };
    const clickImage = () => {
      setIsImageClicked(true);
    };

    return (
      <DisplayThreadContainer>
        <ThreadStyle mode={mode}>
          {thread.imageURL !== null ? (
            <>
              <img
                onClick={clickImage}
                alt={`${user.displayName}'s image`}
                src={thread.imageURL}
              />
              {isImageClicked && (
                <ImageModal
                  URL={thread.imageURL}
                  setIsImageClicked={setIsImageClicked}
                />
              )}
            </>
          ) : null}
          <div id='threadUserPhotoAndThreadInfo'>
            <div id='threadUserPhotoUrl'>
              <img id='userPhoto' alt={'user photo'} src={thread.photoURL} />
            </div>
            <div id='threadInfo'>
              <div id='threadData'>{thread.data}</div>
              <div id='threadCreatedAt'>시간: {thread.createdAt}</div>
              <div id='threadUser'>ID: {thread.user}</div>
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
            {isEditOn && edit ? (
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

            {isEditOn && edit ? (
              <>
                <form onSubmit={onSubmit}>
                  <QuackInput onChange={onChange} type='text' />
                  <div id='setImageBtnAndSubmitBtn'>
                    {URL && <img alt={imgAlt} src={URL} />}
                    <SetImageURL />
                    <SubmitBtn type='submit' size='small'>
                      수정하기
                    </SubmitBtn>
                  </div>
                </form>
              </>
            ) : null}
          </IsOwner>
        ) : null}
      </DisplayThreadContainer>
    );
  }
);

export default DisplayThread;
