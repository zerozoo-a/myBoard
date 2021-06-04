import React from 'react';
import Threads from './Threads';
import LogOutBtn from './LogOutBtn';
import Profile from './Profile';
export default function Home({ userObj }) {
  return (
    <div>
      <h1>HOME</h1>
      <Threads userObj={userObj} />
      <LogOutBtn />
    </div>
  );
}
