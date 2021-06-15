import React, { useState, useEffect } from 'react';
import { fireDB as db } from '../myBase';
import EditProfile from './EditProfile';
import styled from 'styled-components';
import { authService } from '../myBase';
import { useSelector } from 'react-redux';
import { selectMode } from '../store/userReducer';
import { motion } from 'framer-motion';

import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';

const ProfileContainer = styled.div`
  * {
    color: ${(props) =>
      props.mode === 'dark'
        ? props.theme.colors.darkColor
        : props.theme.colors.lightColor};
  }

  #profileTitleStyle {
    width: 55vw;
    h1 {
      color: ${(props) => props.theme.colors.pointColor};
      display: grid;
      place-items: center;
    }
  }
  #profileYourThreads {
    * {
      border: none;
    }
  }
`;
const MyThreadStyle = styled.div`
  & > * {
    list-style: none;
    margin: 0;
    padding: 0;
  }
  li {
    margin: 0 0 3rem 0;
    img {
      width: 8rem;
    }
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
              imageURL: doc.data().imageURL,
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
  const variants = {
    active: {
      x: 0,
    },
    inactive: {
      x: 55,
      transition: { duration: 1.8 },
    },
  };

  return (
    <ProfileContainer mode={mode}>
      <motion.div
        initial={{ opacity: 0.2 }}
        animate={{ opacity: 1.0 }}
        transition={{ duration: 0.4 }}>
        <div id='profileTitleStyle'>
          <h1>내 정보</h1>
          <EditProfile />
        </div>

        <div id='profileYourThreads'>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>
                    <motion.div
                      variants={variants}
                      initial='inactive'
                      animate='active'>
                      <h3>내 게시글 모아보기</h3>
                    </motion.div>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {isMyThreadListLoaded && (
                  <TableRow>
                    <TableCell>
                      <MyThreadStyle>
                        <ul>
                          {myThreadList.map((myThread, i) => (
                            <motion.div
                              key={i + myThread.user}
                              variants={variants}
                              initial='inactive'
                              animate='active'>
                              <li>
                                <img src={myThread.imageURL} />
                                <div>{myThread.data}</div>
                                <div>{myThread.createdAt}</div>
                              </li>
                            </motion.div>
                          ))}
                        </ul>
                      </MyThreadStyle>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </motion.div>
    </ProfileContainer>
  );
};
export default Profile;
