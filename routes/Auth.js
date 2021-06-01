import React, { useState } from 'react';
import { authService } from '../myBase';
import SignIn from './SignIn';
import SnsSignInModal from './SnsSignInModal';

// setIsLoggedIn = > redux store()
export default function Auth({ setIsLoggedIn }) {
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const onChange = (e) => {
    const value = e.target.value;
    const name = e.target.name;
    if (name === 'email') {
      setEmail(value);
    } else if (name === 'password') {
      setPassword(value);
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      let data;
      data = await authService.signInWithEmailAndPassword(email, password);
      alert('로그인 성공!');
      setIsLoggedIn(true);
    } catch (error) {
      alert('error occurred!', error);
    }
  };
  return (
    <div>
      <div>please log in</div>
      <form onSubmit={onSubmit}>
        <input
          onChange={onChange}
          value={email}
          name='email'
          type='text'
          placeholder='E-mail'
          required></input>
        <input
          onChange={onChange}
          value={password}
          name='password'
          type='password'
          placeholder='password'
          required></input>
        <input type='submit' value='Log In'></input>
      </form>
      <SignIn />
      <SnsSignInModal />
    </div>
  );
}
