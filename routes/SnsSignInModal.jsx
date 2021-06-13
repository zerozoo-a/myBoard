import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
// import Button from '@material-ui/core/Button';
import Modal from '@material-ui/core/Modal';
import { authService, getFirebaseAuth } from '../myBase';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { selectMode } from '../store/userReducer';
import { Google } from '@styled-icons/boxicons-logos/Google';
import { Github } from '@styled-icons/boxicons-logos/Github';

// @styled-icons/boxicons-logos/Google

const sns = {
  google: 'Google',
  apple: 'Apple',
  github: 'GitHub',
};
const SnsStyle = styled.div`
  li {
    display: grid;
    place-items: center;
    flex-direction: column;
    margin: 1.5rem;
    border: 0.5px solid #a4a1a1;
    height: 2rem;
    cursor: pointer;
  }
  #Google {
    background-color: white;
    color: rgb(61, 62, 63);
  }
`;

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
    backgroundColor: 'rgb(35,35,35)',
    color: 'white',
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: 400,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

export default function SnsSignInModal({ Button }) {
  let mode = useSelector(selectMode);
  const classes = useStyles();
  const [modalStyle] = useState(getModalStyle);
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const onSnsClick = async (snsName) => {
    let provider = null;
    try {
      if (sns.google === snsName) {
        provider = new getFirebaseAuth.GoogleAuthProvider();
      } else if (sns.github === snsName) {
        provider = new getFirebaseAuth.GithubAuthProvider();
      }
      await authService.signInWithPopup(provider);
    } catch (error) {
      console.log(error);
    }
  };

  const body = (
    <div style={modalStyle} className={classes.paper}>
      <div>
        <ul>
          <SnsStyle>
            <li
              key={sns.google}
              id={sns.google}
              onClick={() => onSnsClick(sns.google)}>
              <span>
                <Google size='25' />
                Google LogIn
              </span>
            </li>
            <li
              key={sns.github}
              id={sns.github}
              onClick={() => onSnsClick(sns.github)}>
              <span>
                <Github size='25' />
                GitHub LogIn
              </span>
            </li>
          </SnsStyle>
        </ul>
      </div>
    </div>
  );

  return (
    <div>
      <Button mode={mode} onClick={handleOpen}>
        SNS 로그인
      </Button>
      <Modal open={open} onClose={handleClose}>
        {body}
      </Modal>
    </div>
  );
}
