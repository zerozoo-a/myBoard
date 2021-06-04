import React, { useState, useEffect } from 'react';
import { fireDB as db } from '../myBase';
import { DisplayThread } from './DisplayThread';
import UploadImageBtn from './UploadImageBtn';
import Button from '@material-ui/core/Button';
import styled from 'styled-components';

export default function Threads({ userObj }) {
  const [thread, setThread] = useState('');
  const [threads, setThreads] = useState([]);
  const [imageDownloadUrls, setImageDownloadUrls] = useState();

  const date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth();
  const day = date.getDay();
  const ThreadsTitle = 'welcome to Thread list';
  const imgAlt = 'user uploading image';

  useEffect(() => {
    db.collection('Thread').onSnapshot((snapShot) => {
      const snapShots = snapShot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setThreads(snapShots);
    });
  }, []);

  const onChange = (event) => {
    let value = event.target.value;
    setThread(value);
  };
  const onSubmit = (event) => {
    event.preventDefault();
    db.collection('Thread').add({
      data: thread,
      createdAt: `📅 ${year}/${month}/${day} `,
      user: userObj.uid,
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
              userObj={userObj}
              isOwner={userObj.uid === thread.user}
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
            userObj={userObj}
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
