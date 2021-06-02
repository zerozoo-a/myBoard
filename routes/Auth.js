import React, { useState } from 'react';
import { authService } from '../myBase';
import SignIn from './SignIn';
import SnsSignInModal from './SnsSignInModal';

// setIsLoggedIn = > redux store()
export default function Auth({ setIsLoggedIn }) {
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
      <SignIn setIsLoggedIn={setIsLoggedIn} />
      <SnsSignInModal setIsLoggedIn={setIsLoggedIn} />
    </div>
  );
}
