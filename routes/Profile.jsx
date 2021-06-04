import React, { useEffect } from 'react';
import { fireDB as db } from '../myBase';
import EditProfile from './EditProfile';
const Profile = ({ userObj, userObjRefresh, isLoggedIn }) => {
  const getMyThreads = async () => {
    const myThreads = await db
      .collection('Thread')
      .where('user', '==', userObj.uid)
      .orderBy('createdAt')
      .get();

    console.log(
      'myThread',
      myThreads.docs.map((doc) => doc.data())
    );
  };

  useEffect(() => {
    if (isLoggedIn) {
      getMyThreads();
    }
  }, [userObj]);

  return (
    <div>
      <h1>Profile</h1>
      <EditProfile userObjRefresh={userObjRefresh} userObj={userObj} />

      <h4>your Threads</h4>
    </div>
  );
};
export default Profile;
