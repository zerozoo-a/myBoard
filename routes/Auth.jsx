import React, { useState } from 'react';
import { authService } from '../myBase';
import SignUp from './SignUp';
import SnsSignInModal from './SnsSignInModal';
import styled from 'styled-components';

const AuthInput = styled.input.attrs((props) => ({
  size: props.size || '1em',
}))`
  color: palevioletred;
  font-size: 1em;
  border: 2px solid palevioletred;
  border-radius: 3px;
  margin: ${(props) => props.size};
  padding: ${(props) => props.size};
`;

export default function Auth({ isLoggedIn, setIsLoggedIn }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
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
      setIsLoggedIn(true);
    } catch (error) {
      alert('error occurred!', error);
    }
  };
  return (
    <div>
      <div>please log in</div>
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
        <input type='submit' value='Log In' />
      </form>
      <SignUp setIsLoggedIn={setIsLoggedIn} />
      <SnsSignInModal setIsLoggedIn={setIsLoggedIn} />
    </div>
  );
}
