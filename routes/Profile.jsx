import React, { useState, useEffect } from 'react';
import { fireDB as db } from '../myBase';
import EditProfile from './EditProfile';
import styled from 'styled-components';

const MyThreadStyle = styled.div`
  & > * {
    list-style: none;
    margin: 0;
    padding: 0;
  }
  img {
    width: 250px;
  }
`;
const Profile = ({ userObj, userObjRefresh, isLoggedIn }) => {
  const [myThreadList, setMyThreadList] = useState([]);
  const [isMyThreadListLoaded, setIseMyThreadListLoaded] = useState(false);
  const getMyThreads = async () => {
    const myThreads = await db
      .collection('Thread')
      .where('user', '==', userObj.uid)
      .orderBy('createdAt')
      .get()
      .then((res) =>
        res.docs.map((doc) =>
          setMyThreadList((prev) => [
            ...prev,
            {
              user: doc.data().user,
              data: doc.data().data,
              imageUrl: doc.data().imageUrl,
              createdAt: doc.data().createdAt,
            },
          ])
        )
      );
  };

  useEffect(() => {
    getMyThreads();
    setIseMyThreadListLoaded(true);
  }, []);

  return (
    <div>
      <h1>Profile</h1>
      <EditProfile userObjRefresh={userObjRefresh} userObj={userObj} />

      <h4>your Threads</h4>
      {isMyThreadListLoaded && (
        <>
          <MyThreadStyle>
            hello
            <ul>
              {myThreadList.map((myThread, i) => (
                <li key={i + myThread.user}>
                  <img src={myThread.imageUrl} />
                  <div>{myThread.data}</div>
                  <div>{myThread.createdAt}</div>
                </li>
              ))}
            </ul>
          </MyThreadStyle>
        </>
      )}
    </div>
  );
};
export default Profile;
