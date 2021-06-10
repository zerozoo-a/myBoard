import React, { useState, Suspense } from 'react';
import { authService } from '../myBase';
import SignUp from './SignUp';
import SnsSignInModal from './SnsSignInModal';
import styled from 'styled-components';
import DuckIcon from './design/DuckIcon';

// import 3D
import Meshes from '../3D/Box';

const AuthContainer = styled.div`
  display: grid;
  grid-template-rows: 0.2fr;
  position: absolute;
  top: 0;
  left: 0;
  #title {
    position: relative;
    top: 100px;
    left: 100px;
    color: ${(props) =>
      props.mode === 'dark'
        ? props.theme.colors.lightBlue500
        : props.theme.colors.white};
  }

  #authSection {
    width: 40vw;
    min-width: 30vw;
    height: 100vh;
    margin: 0;
    /* padding-top: 20vh; */
    background-color: ${(props) => props.theme.colors.black};
    color: ${(props) => props.theme.colors.white};
    min-width: ${(props) => props.theme.deviceSizes.mobileM};
    background-color: ${(props) =>
      props.mode === 'dark' ? 'rgba(32,32,32,0.8)' : 'rgba(244,244,244,0.8)'};
  }
  #icon {
    position: absolute;
    transform: scale(0.5);
    left: 0;
    top: 0;
  }
  #buttons {
    display: flex;
  }
`;

const AuthInput = styled.input.attrs(() => ({
  size: '0.6em',
}))`
  background-color: ${(props) => props.theme.colors.white};
  color: ${(props) => props.theme.colors.lightBlue500};
  font-size: 1em;
  border: 2px solid ${(props) => props.theme.colors.lightBlue500};
  border-radius: 3px;
  margin: ${(props) => props.size};
  padding: ${(props) => props.size};
  cursor: pointer;
`;

export default function Auth({ isLoggedIn, setIsLoggedIn }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [mode, setMode] = useState('dark');
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
  return (
    <div>
      <AuthContainer mode={mode}>
        <div>
          <DuckIcon id='icon' />
        </div>
        <div id='title'>
          <h3>Space QuackQuack</h3>
        </div>
        <div id='authSection'>
          <form autoComplete='off' onSubmit={onSubmit}>
            <AuthInput
              onChange={onChange}
              value={email}
              type='text'
              name='email'
              placeholder='E-mail'
              required
            />
            <AuthInput
              onChange={onChange}
              value={password}
              name='password'
              type='password'
              placeholder='password'
              required
            />
            <AuthInput type='submit' value='Log In' />
          </form>
          <div id='buttons'>
            <SignUp />
            <SnsSignInModal />
          </div>
        </div>
      </AuthContainer>

      <Meshes id='meshes' />
    </div>
  );
}
