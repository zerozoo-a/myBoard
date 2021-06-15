import React, { useState, useEffect, memo } from 'react';
import { authService, fireDB as db } from '../myBase';
import DisplayThread from './DisplayThread';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { selectMode } from '../store/userReducer';
import { selectURL, setURL } from '../store/imageReducer';
import SetImageURL from './SetImageURL';
import ImageModal from './ImageModal';
import { motion } from 'framer-motion';

const ThreadStyle = styled.div`
  display: grid;
  place-items: center;
  color: ${(props) => props.theme.colors.pointColor};
  #userInputThread {
    margin-bottom: 5.5rem;
    padding-bottom: 2rem;
    border-bottom: 1px solid
      ${(props) =>
        props.mode === 'dark'
          ? props.theme.colors.darkBorderColor
          : props.theme.colors.lightBorderColor};
  }
  #userPhotoAndInputContainer {
    display: flex;
    align-items: center;
    margin-top: 5rem;
  }
  #inputUserPhotoURL {
    width: 3rem;
    height: 3rem;
    border-radius: 50%;
  }
  #uploadImageBtnAndSubmitBtn {
    display: flex;
    margin: 0.5rem;
    align-items: center;

    #normalImage {
      width: 8rem;
      cursor: pointer;
      margin-left: 2rem;
    }
  }
`;
const QuackInput = styled.input.attrs(() => ({
  size: '0.6em',
}))`
  width: 45vw;
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
  min-height: ${(props) => props.theme.interval.base};
  max-height: ${(props) => props.theme.interval.base};
  background-color: ${(props) => props.theme.button.submitBackgroundColor};
  color: ${(props) =>
    props.mode === 'dark'
      ? props.theme.colors.darkColor
      : props.theme.colors.lightColor};
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
  const [isImageClicked, setIsImageClicked] = useState(false);
  const mode = useSelector(selectMode);
  const URL = useSelector(selectURL);
  const date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth();
  const actualDate = date.getDate();
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();
  const metaCreatedTime = date.getTime();
  const ThreadsTitle = 'Welcome to Quack Quack Board!';
  const alt = 'user uploaded image';
  const user = authService.currentUser;
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchSnapShot = db
      .collection('Thread')
      .orderBy('metaCreatedTime', 'desc')
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
      photoURL: user.photoURL,
      imageURL: URL ? URL : null,
    });
    setThread('');
    dispatch(setURL(null));
  };
  const imageClickOn = () => {
    setIsImageClicked(true);
  };

  return (
    <motion.div
      initial={{ opacity: 0.2 }}
      animate={{ opacity: 1.0 }}
      transition={{ duration: 0.4 }}>
      <ThreadStyle mode={mode}>
        <h1>HOME</h1>
        <h4> {ThreadsTitle}</h4>
        <div id='userInputThread'>
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
              <div>
                <SetImageURL />
              </div>
              <SubmitBtn mode={mode} type='submit' id='submit' name='submit'>
                등록하기
              </SubmitBtn>
              {URL === null ? null : (
                <img
                  id='normalImage'
                  onClick={imageClickOn}
                  src={URL}
                  alt={alt}
                />
              )}
              {isImageClicked && (
                <ImageModal URL={URL} setIsImageClicked={setIsImageClicked} />
              )}
            </div>
          </form>
        </div>
        <motion.div
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}>
          {threads.map((thread, i) => (
            <DisplayThread
              key={thread.id}
              thread={thread}
              isOwner={user.uid === thread.uid}
              QuackInput={QuackInput}
              SubmitBtn={SubmitBtn}
            />
          ))}
        </motion.div>
      </ThreadStyle>
    </motion.div>
  );
};
export default memo(Threads);
