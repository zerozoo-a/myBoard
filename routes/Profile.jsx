import React, { useState, useEffect } from 'react';
import { fireDB as db } from '../myBase';
import EditProfile from './EditProfile';
import styled from 'styled-components';
import { authService } from '../myBase';
import { useSelector } from 'react-redux';
import { selectMode } from '../store/userReducer';

const ProfileContainer = styled.div`
  #profileTitleStyle {
    h1 {
      color: ${(props) => props.theme.colors.pointColor};
    }
  }
  #profileYourThreads {
    h4,
    div {
      color: ${(props) =>
        props.mode === 'dark'
          ? (props) => props.theme.colors.darkColor
          : (props) => props.theme.colors.lightColor};
    }
  }
`;
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
const Profile = () => {
  const user = authService.currentUser;
  const [myThreadList, setMyThreadList] = useState([]);
  const [isMyThreadListLoaded, setIsMyThreadListLoaded] = useState(false);
  const mode = useSelector(selectMode);
  const getMyThreads = async () => {
    const myThreads = await db
      .collection('Thread')
      .where('uid', '==', user.uid)
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
    setIsMyThreadListLoaded(true);
  }, []);

  return (
    <ProfileContainer mode={mode}>
      <div id='profileTitleStyle'>
        <h1>내 정보</h1>
        <EditProfile />
      </div>

      <div id='profileYourThreads'>
        <h4>내 이야기의 기록들</h4>
        {isMyThreadListLoaded && (
          <>
            <MyThreadStyle>
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
    </ProfileContainer>
  );
};
export default Profile;
