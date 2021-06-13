import React, { useState, useEffect, memo } from 'react';
import { authService, fireDB as db } from '../myBase';
import DisplayThread from './DisplayThread';
import UploadImageBtn from './UploadImageBtn';
import styled from 'styled-components';
import { useLocation } from 'react-router';
import { useSelector } from 'react-redux';
import { selectMode } from '../store/userReducer';
const ThreadStyle = styled.div`
  display: grid;
  place-items: center;
  color: ${(props) => props.theme.colors.pointColor};
  #userPhotoAndInputContainer {
    display: flex;
    align-items: center;
    margin-top: 5rem;
  }
  #inputUserPhotoURL {
    width: 3rem;
    border-radius: 50%;
  }
  #uploadImageBtnAndSubmitBtn {
    display: flex;
    margin: 0.5rem;
  }
`;
const QuackInput = styled.input.attrs(() => ({
  size: '0.6em',
}))`
  width: 50vw;
  height: 4rem;
  font-size: 1em;
  background-color: ${(props) =>
    props.mode === 'dark'
      ? props.theme.colors.darkBackgroundColor
      : props.theme.colors.lightBackgroundColor};
  color: ${(props) =>
    props.mode === 'dark'
      ? props.theme.colors.darkColor
      : props.theme.colors.lightColor};
  border: 3px solid
    ${(props) =>
      props.mode === 'dark'
        ? (props) => props.theme.colors.pointColor
        : props.theme.colors.pointColor};
  border-radius: 3px;
  margin-left: ${(props) => props.theme.margins.base};
  padding-left: ${(props) => props.theme.margins.base};
  cursor: pointer;
`;
const SubmitBtn = styled.button`
  min-width: ${(props) => props.theme.interval.basePlus};
  min-height: ${(props) => props.theme.interval.small};
  background-color: ${(props) => props.theme.button.submitBackgroundColor};
  color: ${(props) => props.theme.button.submitColor};
  border: 2px solid ${(props) => props.theme.button.submitBorderColor};
  border-radius: 5px;
  cursor: pointer;
  padding: ${(props) => props.theme.button.paddingSmall};
  margin: ${(props) => props.theme.button.marginSmall};
  font-size: ${(props) => props.theme.button.fontSize};
`;
const Threads = () => {
  const [thread, setThread] = useState('');
  const [threads, setThreads] = useState([]);
  const [imageDownloadUrls, setImageDownloadUrls] = useState();
  const mode = useSelector(selectMode);
  console.log('mode: ', mode);

  const date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth();
  const actualDate = date.getDate();
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();
  const metaCreatedTime = date.getTime();
  const ThreadsTitle = 'welcome to Thread Board';
  let location = useLocation();
  const user = authService.currentUser;

  // console.log('user photoURL', user);

  useEffect(() => {
    const fetchSnapShot = db
      .collection('Thread')
      .orderBy('metaCreatedTime')
      .onSnapshot((snapShot) => {
        const snapShots = snapShot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setThreads(snapShots);
      });
    return () => {
      fetchSnapShot();
    };
  }, []);

  const onChange = (event) => {
    let value = event.target.value;
    setThread(value);
  };
  const onSubmit = (event) => {
    event.preventDefault();
    db.collection('Thread').add({
      data: thread,
      metaCreatedTime: metaCreatedTime,
      createdAt: `
      ${hours} : ${minutes} : ${seconds} _
       ${year}/${month}/${actualDate}
      `,
      uid: user.uid,
      user: user.displayName,
      photoUrl: user.photoURL,
      imageUrl: imageDownloadUrls ? imageDownloadUrls : null,
    });
    setThread('');
    setImageDownloadUrls(undefined);
  };

  return (
    <ThreadStyle mode={mode}>
      <h1>HOME</h1>
      <h4> {ThreadsTitle}</h4>
      <div>
        <form onSubmit={onSubmit}>
          <div id='userPhotoAndInputContainer'>
            <img id='inputUserPhotoURL' src={user.photoURL} />
            <QuackInput
              mode={mode}
              id='QuackInput'
              onChange={onChange}
              type='text'
              placeholder="What's happening?"
              required
              value={thread}
              maxLength='80'
              name='inputThread'
            />
          </div>
          <div id='uploadImageBtnAndSubmitBtn'>
            <UploadImageBtn
              imageDownloadUrls={imageDownloadUrls}
              setImageDownloadUrls={setImageDownloadUrls}
            />
            <SubmitBtn type='submit' id='submit' name='submit'>
              등록하기
            </SubmitBtn>
          </div>
        </form>
      </div>
      <div>
        {threads.map((thread, i) => (
          <DisplayThread
            key={thread.id}
            thread={thread}
            isOwner={user.uid === thread.uid}
            imageDownloadUrls={imageDownloadUrls}
            setImageDownloadUrls={setImageDownloadUrls}
            QuackInput={QuackInput}
            SubmitBtn={SubmitBtn}
          />
        ))}
      </div>
    </ThreadStyle>
  );
};
export default memo(Threads);
