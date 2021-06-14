import React, { useState, Suspense } from 'react';
import { authService } from '../myBase';
import SignUp from './SignUp';
import SnsSignInModal from './SnsSignInModal';
import styled from 'styled-components';
import DuckIcon from './design/DuckIcon';
import { Mail } from '@styled-icons/entypo/Mail';
import { KeyFill } from '@styled-icons/bootstrap';
import { useHistory } from 'react-router-dom';

// import 3D
import Meshes from '../3D/Box';

const AuthContainer = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  width: 30vw;
  height: 100vh;
  overflow-y: scroll;
  -ms-overflow-style: none; /* for Internet Explorer, Edge */
  scrollbar-width: none; /* for Firefox */
  overflow-y: scroll;

  &::-webkit-scrollbar {
    display: none; /* for Chrome, Safari, and Opera */
  }
  background-color: ${(props) => props.theme.colors.black};
  color: ${(props) => props.theme.colors.white};
  min-width: ${(props) => props.theme.deviceSizes.mobileL};
  background-color: ${(props) =>
    props.mode === 'dark' ? 'rgba(32,32,32,0.8)' : 'rgba(244,244,244,0.8)'};
  #authIcon {
    cursor: pointer;
  }
  #title {
    color: ${(props) =>
      props.mode === 'dark'
        ? props.theme.colors.lightBlue500
        : props.theme.colors.white};
    margin-left: 6.5rem;
    margin-top: 2.5rem;
    font-size: 1.5rem;
  }

  #authSection {
    width: 40vw;
    min-width: 30vw;
    margin: 0;
    margin-top: 5rem;
    margin-left: 5rem;
  }
  #icon {
    position: absolute;
    transform: scale(0.5);
    left: -1rem;
    top: -1rem;
  }
  #buttons {
    display: flex;
  }
  #authSubHeading,
  #authSubDescription {
    @font-face {
      font-family: 'Monaco';
      src: url('./ttf/SquaredMonaco/monaco.ttf');
    }
    margin: 1rem 0 0 0;
    color: ${(props) =>
      props.mode === 'dark'
        ? props.theme.colors.darkColor
        : props.theme.colors.lightColor};
    font-family: Monaco;
    font-size: 1.5rem;
  }
`;

const AuthInput = styled.input.attrs(() => ({
  size: '0.6em',
}))`
  background-color: ${(props) =>
    props.mode === 'dark'
      ? props.theme.colors.darkBackgroundColor
      : props.theme.colors.lightBackgroundColor};
  color: ${(props) => props.theme.colors.lightBlue500};
  font-size: 1em;
  border: 2px solid ${(props) => props.theme.colors.lightBlue500};
  border-radius: 3px;
  margin: ${(props) => props.size};
  padding: ${(props) => props.size};
  cursor: pointer;
`;

const Button = styled.button`
  min-width: ${(props) => props.theme.interval.xl};
  background-color: ${(props) =>
    props.mode === 'dark'
      ? props.theme.colors.darkBackgroundColor
      : props.theme.colors.lightBackgroundColor};
  color: ${(props) =>
    props.mode === 'dark'
      ? props.theme.colors.darkColor
      : props.theme.colors.lightColor};
  line-height: 2.5em;
  border: 2px solid
    ${(props) =>
      props.mode === 'dark'
        ? props.theme.colors.darkBorderColor
        : props.theme.colors.lightBorderColor};
  border-radius: 13px;
  cursor: pointer;
  padding: ${(props) => props.theme.button.padding};
  margin: ${(props) => props.theme.button.margin};
  font-size: ${(props) => props.theme.button.fontSize};
`;

export default function Auth() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [mode, setMode] = useState('dark');
  let history = useHistory();
  const onChange = (e) => {
    const value = e.target.value;
    const name = e.target.name;
    if (name === 'email') {
      setEmail(value);
    } else if (name === 'password') {
      setPassword(value);
    }
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    try {
      let data;
      data = await authService.signInWithEmailAndPassword(email, password);
    } catch (error) {
      alert('error occurred!', error);
    }
  };

  const moveHome = () => {
    history.replace('/');
  };
  return (
    <div>
      <AuthContainer mode={mode}>
        <div onClick={moveHome} id='authIcon'>
          <DuckIcon id='icon' />
          <h3 id='title'>Space Quack Quack</h3>
        </div>

        <div id='authSection'>
          <form autoComplete='off' onSubmit={onSubmit}>
            <label name='email'>
              <Mail size='25' />
            </label>
            <AuthInput
              mode={mode}
              onChange={onChange}
              value={email}
              type='text'
              name='email'
              placeholder='E-mail'
              required
            />
            <div>
              <label name='password'>
                <KeyFill size='25' />
              </label>
              <AuthInput
                mode={mode}
                onChange={onChange}
                value={password}
                name='password'
                type='password'
                placeholder='password'
                required
              />
            </div>
            <Button mode={mode} type='submit'>
              로그인
            </Button>
          </form>
          <div id='buttons'>
            <SignUp AuthInput={AuthInput} Button={Button} />
            <SnsSignInModal Button={Button} />
          </div>
          <div>
            <h3 id='authSubHeading'> Happening now </h3>
            <h5 id='authSubDescription'>Join Space Quack Quack today.</h5>
          </div>
        </div>
      </AuthContainer>

      <Meshes id='meshes' />
    </div>
  );
}
