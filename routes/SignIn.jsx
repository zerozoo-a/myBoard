import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Modal from '@material-ui/core/Modal';
import { authService } from '../myBase';

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

export default function SignIn({ setIsLoggedIn }) {
  const classes = useStyles();
  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(false);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

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
      data = await authService.createUserWithEmailAndPassword(email, password);
      alert('회원가입 성공! 🥳🎉');
      setIsLoggedIn(true);
      handleClose();
    } catch (error) {
      console.log(error);
      setErrorMsg(error);
      if (error.code === 'auth/invalid-email') {
        alert('잘못된 이메일 형식입니다. 😰', errorMsg);
      } else if (error.code === 'auth/weak-password') {
        alert('비밀번호 보안이 취약합니다.', errorMsg);
      } else {
        alert(errorMsg);
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
    <div style={modalStyle} className={classes.paper}>
      <h2 id='simple-modal-title'>새로운 계정 생성하기</h2>
      <p id='simple-modal-description'>
        E-mail과 password를 입력해 계정을 만들어보세요.
      </p>
      <form onSubmit={onSubmit}>
        <div>
          <label>E-mail</label>
          <div>
            <input
              placeholder='abc@gmail.com'
              type='text'
              name='email'
              required
              onChange={onChange}
            />
          </div>
        </div>
        <div>
          <label>password</label>
          <div>
            <input
              placeholder='password'
              type='password'
              name='password'
              required
              onChange={onChange}
            />
          </div>
          <h4>{errorMsg}</h4>
        </div>
        <Button type='submit'>회원가입</Button>
      </form>
    </div>
  );

  return (
    <div>
      <Button
        onClick={handleOpen}
        type='button'
        size='small'
        variant='contained'
        color='secondary'>
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
