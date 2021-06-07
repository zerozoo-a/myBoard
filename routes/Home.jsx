import React from 'react';
import Threads from './Threads';
export default function Home({ userObj }) {
  return (
    <div>
      <h1>HOME</h1>
      <Threads userObj={userObj} />
    </div>
  );
}
