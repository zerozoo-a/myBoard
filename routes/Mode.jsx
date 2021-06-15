import React from 'react';
import { selectMode, setDarkMode, setLightMode } from '../store/userReducer';
import { useDispatch, useSelector } from 'react-redux';
import styled, { keyframes } from 'styled-components';

const animateToRightToggle = keyframes`
0%{
  transform:translateX(0);
  opacity:0.1;
}
50%{
  opacity:0.5;
}
100%{
  transform:translateX(2.5rem);
  opacity:1;
}
`;
const animateToLeftToggle = keyframes`
0%{
  transform:translateX(2rem);
  opacity:0.1;
}
50%{
  opacity:0.5;
}
100%{
  transform:translateX(-0.5rem);
  opacity:1;
}
`;
const circleLeftMove = keyframes`
0%{
  transform:translateX(0rem);
  opacity:0.1;
}
50%{
  opacity:0.5;
}
100%{
  transform:translateX(-2.5rem);
  opacity:1;
}
`;
const circleRightMove = keyframes`
0%{
  transform:translateX(-2.5rem);
  opacity:0.1;
}
50%{
  opacity:0.5;
}
100%{
  transform:translateX(0.5rem);
  opacity:1;
}
`;
const translate = { left: 'translateX(-2.5rem)', right: 'translateX(0.5rem)' };
const ModeContainer = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  background-color: ${(props) =>
    props.mode === 'dark'
      ? props.theme.colors.deepDarkBackgroundColor
      : props.theme.colors.pointColor};
  width: 6.5rem;
  height: 3rem;
  border-radius: 3rem;
  margin-left: 2rem;

  #toggler {
    display: flex;
  }
  #Sun {
    color: ${(props) => props.theme.colors.orange500};
    animation: ${animateToRightToggle} 1s ease-in-out;
    transform: translateX(2.5rem);
    font-size: 2rem;
  }
  #Moon {
    color: yellow;
    animation: ${animateToLeftToggle} 1s ease-in-out;
    transform: translateX(-0.5rem);
    font-size: 2rem;
  }
  #circle {
    width: 2rem;
    height: 2rem;
    /* margin-top: calc(0.625 / 2rem); */
    margin-top: 0.3125rem;
    /* margin-bottom: calc(0.625 / 2rem); */

    background-color: white;
    border-radius: 50%;
    animation: 1s ease-in-out
      ${(props) => (props.mode === 'dark' ? circleRightMove : circleLeftMove)};
    transform: ${(props) =>
      props.mode === 'dark' ? translate.right : translate.left};
  }
`;

export default function Mode() {
  const dispatch = useDispatch();
  const mode = useSelector(selectMode);
  const onClick = () => {
    if (mode === 'dark') {
      dispatch(setLightMode());
    } else {
      dispatch(setDarkMode());
    }
  };
  return (
    <ModeContainer mode={mode} onClick={onClick}>
      {mode === 'dark' ? (
        <div id='toggler'>
          <span id='Moon'>🌝</span>
          <div id='circle' />
        </div>
      ) : (
        <div id='toggler'>
          <span id='Sun'>🌞</span>
          <div id='circle' />
        </div>
      )}
    </ModeContainer>
  );
}
