import React, { useState, useEffect } from 'react';
import { authService, fireDB as db } from '../myBase';
import { DisplayThread } from './DisplayThread';
import UploadImageBtn from './UploadImageBtn';
import Button from '@material-ui/core/Button';
import styled from 'styled-components';
import { useLocation } from 'react-router';

export default function Threads() {
  const [thread, setThread] = useState('');
  const [threads, setThreads] = useState([]);
  const [imageDownloadUrls, setImageDownloadUrls] = useState();

  const date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth();
  const actualDate = date.getDate();
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();
  const metaCreatedTime = date.getTime();
  const ThreadsTitle = 'welcome to Thread list';
  let location = useLocation();
  const user = authService.currentUser;

  useEffect(() => {
    const unsubscribe = db
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
      unsubscribe();
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
    <div>
      <ol>
        <h4> {ThreadsTitle}</h4>
        <div>
          {threads.map((thread, i) => (
            <DisplayThread
              key={thread.id}
              thread={thread}
              isOwner={user.uid === thread.uid}
              imageDownloadUrls={imageDownloadUrls}
              setImageDownloadUrls={setImageDownloadUrls}
            />
          ))}
        </div>
      </ol>
      <div>
        <form onSubmit={onSubmit}>
          <UploadImageBtn
            imageDownloadUrls={imageDownloadUrls}
            setImageDownloadUrls={setImageDownloadUrls}
          />

          <input
            onChange={onChange}
            type='text'
            placeholder="What's happening?"
            required
            value={thread}
            maxLength='80'
            name='inputThread'></input>
          <Button type='submit' id='submit' name='submit'>
            submit
          </Button>
        </form>
      </div>
    </div>
  );
}
