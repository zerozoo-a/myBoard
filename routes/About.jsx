import React from 'react';
import styled from 'styled-components';
import {
  Table,
  TableContainer,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
} from '@material-ui/core';
import { selectMode } from '../store/userReducer';
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import Deck from './Deck';
const AboutContainer = styled.div`
  display: grid;
  place-items: center;

  h1,
  h2,
  h3 {
    margin: 2rem 0;
  }
  h1 {
    color: ${(props) => props.theme.colors.pointColor};
  }
  * {
    color: ${(props) =>
      props.mode === 'dark'
        ? props.theme.colors.darkColor
        : props.theme.colors.lightColor};
  }
  #TableContainer {
    /* width: 40vw; */
    margin: 0 auto;
    margin-bottom: 12rem;
    div,
    p,
    span {
      max-width: 60vw;
      font-size: 1rem;
    }
  }
`;

const variants = {
  active: {
    x: 0,
  },
  inactive: {
    x: 55,
    transition: { duration: 1.8 },
  },
};
export default function About() {
  const mode = useSelector(selectMode);

  return (
    <AboutContainer mode={mode}>
      <Deck></Deck>
      <h1>About</h1>

      <motion.img
        initial={{
          opacity: 0.1,
          rotateY: 60,
        }}
        animate={{
          opacity: 1,
          rotateY: 0,
          transition: { duration: 2 },
        }}
        alt='윤영주의 미모티콘'
        src='https://user-images.githubusercontent.com/80259925/118583181-9de3d700-b7cf-11eb-814c-ec6afef526b2.jpeg'
      />
      <h2>안녕하세요? </h2>
      <h3>프론트엔드 개발자 지망생 윤영주입니다. </h3>
      <h3>About 페이지에 방문해주셔서 감사합니다.</h3>

      <div>
        Contact: <a href=' mailto:zerozoo385@gmail.com'>zerozoo385@gmail.com</a>
      </div>
      <div>
        Git Hub:
        <a href='https://github.com/zerozoo-front/portfolioHome'>Git Hub</a>
      </div>

      <motion.div initial='inactive' animate='active' variants={variants}>
        <TableContainer id='TableContainer'>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                  <p>사용한 기술 스택 📚</p>
                </TableCell>
                <TableCell>
                  <p>FEATURE</p>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell>
                  <div>React.js</div>
                </TableCell>
                <TableCell>
                  <div>React를 기반으로 SPA웹을 구현하였습니다.</div>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <div>firebase</div>
                </TableCell>
                <TableCell>
                  <div>
                    firebase를 통해 backend를 생성하고 OAuth로 로그인과 로그아웃
                    기능을 구현하였습니다.
                  </div>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <div>rerdux-toolkit</div>
                </TableCell>
                <TableCell>
                  <div>
                    components간에 전달이 많이 필요한 state를 redux-toolkit을
                    사용해 관리하였습니다.
                  </div>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <div>react-router</div>
                </TableCell>
                <TableCell>
                  <div>router를 통한 SPA 웹앱을 확장하였습니다.</div>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <div>
                    <span>💅</span>styled-components
                  </div>
                </TableCell>
                <TableCell>
                  <div>
                    기본적인 css styling에 더불어 여러 중복되는 style 값을
                    props로 넘겨 코드의 중복을 줄인 스타일을 구현하였습니다.
                  </div>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <div>
                    <span></span>Material-UI
                  </div>
                </TableCell>
                <TableCell>
                  <div>
                    깔끔하고 유저 친화적인 UI에 style을 통일시키기 위해 💅
                    styled-components와 병행하여 사용하였습니다.
                  </div>
                </TableCell>
              </TableRow>

              <TableRow>
                <TableCell>
                  <div>
                    <span></span>Three.js
                  </div>
                </TableCell>
                <TableCell>
                  <div>
                    로그인 페이지의 카메라 조작이 가능한 우주 속 오리 배경을
                    만들때 사용하였습니다.
                  </div>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <div>
                    <span></span>figma
                  </div>
                </TableCell>
                <TableCell>
                  <div>SVG file과 화면 구성을 잡을 때 사용하였습니다.</div>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </motion.div>
    </AboutContainer>
  );
}
