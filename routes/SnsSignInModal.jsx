import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Modal from '@material-ui/core/Modal';
import { authService, getFirebaseAuth } from '../myBase';
import styled from 'styled-components';

const SnsStyle = styled.div`
  li {
    margin: 25px 0;
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
    backgroundColor: theme.palette.background.paper,

    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

export default function SnsSignInModal() {
  const classes = useStyles();
  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(false);

  const sns = {
    google: 'Google',
    apple: 'Apple',
    github: 'GitHub',
  };
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const onSnsClick = async (snsName) => {
    let provider = null;
    if (sns.google === snsName) {
      provider = new getFirebaseAuth.GoogleAuthProvider();
    } else if (sns.github === snsName) {
      provider = new getFirebaseAuth.GithubAuthProvider();
    }
    console.log(provider);
    await authService.signInWithPopup(provider);
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
              Google LogIn
            </li>
            <li
              key={sns.github}
              id={sns.github}
              onClick={() => onSnsClick(sns.github)}>
              GitHub LogIn
            </li>
          </SnsStyle>
        </ul>
      </div>
    </div>
  );

  return (
    <div>
      <Button
        onClick={handleOpen}
        size='small'
        variant='contained'
        color='primary'>
        SNS 로그인
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
