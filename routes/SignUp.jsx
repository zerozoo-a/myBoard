import React, { useState } from 'react';
// import { makeStyles } from '@material-ui/core/styles';

import styled from 'styled-components';
import Modal from '@material-ui/core/Modal';
import { authService } from '../myBase';
import unknownUserImage from '../../imgs/unknownUserIcon.png';
import { useSelector } from 'react-redux';
import { selectMode, selectIsOnline } from '../store/userReducer';
import { Mail } from '@styled-icons/entypo/Mail';
import { KeyFill } from '@styled-icons/bootstrap';
import { useDispatch } from 'react-redux';
import PhraseGen from 'korean-random-words';

const ModalStyle = styled.div`
  display: grid;
  place-items: center;
  position: absolute;
  height: 18rem;
  width: 35rem;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: ${(props) =>
    props.mode === 'dark'
      ? props.theme.colors.darkBackgroundColor
      : props.theme.colors.lightBackgroundColor};

  color: ${(props) =>
    props.mode === 'dark'
      ? props.theme.colors.darkColor
      : props.theme.colors.lightColor};
  h2,
  p {
    padding: 0.5rem;
  }
  #signUp {
    margin: 0 auto;
  }
`;

export default function SignUp({ Button, AuthInput }) {
  let mode = useSelector(selectMode);
  const [open, setOpen] = React.useState(false);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [isSignUpSuccess, setIseSignUpSuccess] = useState(false);
  const dispatch = useDispatch();
  const isOnline = useSelector(selectIsOnline);
  const phraseGen = new PhraseGen();

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
      const data = await authService.createUserWithEmailAndPassword(
        email,
        password
      );
      const user = authService.currentUser;
      user.updateProfile({
        displayName: phraseGen.generatePhrase(),
        photoURL: unknownUserImage,
      });
      return data;
    } catch (error) {
      setErrorMsg(error);
      if (error.code === 'auth/invalid-email') {
        alert('잘못된 이메일 형식입니다. 😰', errorMsg);
      } else if (error.code === 'auth/weak-password') {
        alert('비밀번호 보안이 취약합니다.', errorMsg);
      } else {
        alert(error);
      }
    }
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const body = (
    <ModalStyle mode={mode}>
      <h2 id='simple-modal-title'>새로운 계정 생성하기</h2>
      <p id='simple-modal-description'>
        E-mail과 password를 입력해 계정을 만들어보세요.
      </p>
      <form onSubmit={onSubmit}>
        <div>
          <div>
            <label name='email'>
              <Mail size='25' />
            </label>
            <AuthInput
              mode={mode}
              placeholder='abc@gmail.com'
              type='text'
              name='email'
              required
              onChange={onChange}
            />
          </div>
        </div>
        <div>
          <div>
            <label name='password'>
              <KeyFill size='25' />
            </label>
            <AuthInput
              mode={mode}
              placeholder='password'
              type='password'
              name='password'
              required
              onChange={onChange}
            />
          </div>
          <h4>{errorMsg}</h4>
        </div>
        <Button id='signUp' mode={mode} type='submit'>
          회원가입
        </Button>
      </form>
    </ModalStyle>
  );

  return (
    <div>
      <Button mode={mode} onClick={handleOpen}>
        새로운 계정 만들기
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby='simple-modal-title'
        aria-describedby='simple-modal-description'>
        {body}
      </Modal>
    </div>
  );
}
