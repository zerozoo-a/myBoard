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
const AboutContainer = styled.div`
  display: grid;
  place-items: center;
  h2,
  h3 {
    margin: 2rem 0;
  }
  * {
    display: grid;
    place-items: center;
    color: ${(props) =>
      props.mode === 'dark'
        ? props.theme.colors.darkColor
        : props.theme.colors.lightColor};
  }
  #TableContainer {
  }
`;

export default function About() {
  const mode = useSelector(selectMode);

  return (
    <AboutContainer mode={mode}>
      <img
        alt='윤영주의 미모티콘'
        src='https://user-images.githubusercontent.com/80259925/118583181-9de3d700-b7cf-11eb-814c-ec6afef526b2.jpeg'
      />
      <div>
        <h2>안녕하세요? </h2>
        <h3>프론트엔드 개발자 지망생 윤영주입니다. </h3>
        <h3>About 페이지에 방문해주셔서 감사합니다.</h3>

        <TableContainer id='TableContainer'>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                  <h3>사용한 기술 스택 📚</h3>
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
                    기능, 실시간 database snapshot을 활용하여 업데이트를 빠르게
                    확인할 수 있습니다.
                  </div>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <div>rerdux-toolkit</div>
                </TableCell>
                <TableCell>
                  <div>
                    redux에서 직접 출시한 redux-toolkit을 적용하여 많은 데이터를
                    props로 넘기지 않고 store에서 관리합니다. components간에
                    전달이 많이 필요한 state를 redux-toolkit을 사용해
                    관리하였습니다.
                  </div>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <div>react-router</div>
                </TableCell>
                <TableCell>
                  <div>
                    router를 통한 SPA 웹앱을 확장하였습니다. 메뉴바를 통해
                    유저는 해당 웹앱의 여러 페이지를 넘나들 수 있게
                    구현했습니다.
                  </div>
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
                    기본적인 css styling에 더불어 여러 중복되는 style 값과
                    state값의 변경에 따른 style 변화를 styled components를 통해
                    중복을 줄이고 보다 깔끔하고 가벼운 코드를 작성하였습니다.
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
                    Material-UI에서 제공하는 정돈된 UI를 사용하여 UI를
                    구현하였습니다. style을 통일시키기 위해 💅
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
                    만들때 사용하였습니다. 고객에게 신선하고 기억에 남는 화면을
                    보여줄 수 있다고 생각합니다.
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
      </div>
    </AboutContainer>
  );
}
