import React, { useState, useEffect } from 'react';
import { fireDB as db } from '../myBase';
import { authService as info } from '../myBase';
import { DisplayThread } from './DisplayThread';

export default function Threads({ userObj }) {
  const [thread, setThread] = useState('');
  const [threads, setThreads] = useState([]);
  const date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth();
  const day = date.getDay();
  const ThreadsTitle = 'welcome to Thread list';

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
    });
  };
  console.log('userObj: ', userObj);
  console.log('threads: ', threads);

  return (
    <div>
      <div>
        <ol>
          <div>
            <h4> {ThreadsTitle}</h4>
            <div>
              {threads.map((thread, i) => (
                <DisplayThread
                  key={thread.id}
                  thread={thread}
                  userObj={userObj}
                  isOwner={userObj.uid === thread.user}
                />
              ))}
            </div>
          </div>
        </ol>
      </div>
      <div>
        <form onSubmit={onSubmit}>
          <input
            onChange={onChange}
            type='text'
            placeholder="What's happening?"
            value={thread}
            name='inputThread'></input>
          <input type='submit' value='submit' name='submit' />
        </form>
      </div>
    </div>
  );
}
