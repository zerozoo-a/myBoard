import React, { useState } from 'react';
import styled from 'styled-components';
import SetImageURL from './SetImageURL';

import Modal from '@material-ui/core/Modal';
import { authService } from '../myBase';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';
import ImagePlaceHolder from './imagePlaceholder';

import { useSelector, useDispatch } from 'react-redux';
import { selectMode } from '../store/userReducer';
import { selectURL, setURL } from '../store/imageReducer';

const EditProfileNickNameContainer = styled.div`
  * ::before,
  *,
  * ::after {
    border: none;
    color: ${(props) =>
      props.mode === 'dark'
        ? props.theme.colors.darkColor
        : props.theme.colors.lightColor};
  }

  #headMyProfile {
    border: none;
  }
  #inputNickName {
    height: 2rem;
    border: 2px solid ${(props) => props.theme.colors.pointColor};
    border-radius: 4px;
    margin-right: 1rem;
  }
  #bodyRow * {
    width: 30%;
    min-width: 30%;
    color: ${(props) =>
      props.mode === 'dark'
        ? props.theme.colors.darkColor
        : props.theme.colors.lightColor};
  }
  #myNickName {
    border-bottom: 1px solid
      ${(props) =>
        props.mode === 'dark'
          ? props.theme.colors.darkBorderColor
          : props.theme.colors.lightBorderColor};
  }
  #editNickName {
    border-bottom: 1px solid
      ${(props) =>
        props.mode === 'dark'
          ? props.theme.colors.darkBorderColor
          : props.theme.colors.lightBorderColor};

    #nickNameInputSet {
      white-space: nowrap;
      min-width: 15rem;
      #inputNickName {
        min-width: 20vw;
      }
    }
  }
`;
const Button = styled.button`
  color: ${(props) =>
    props.mode === 'dark'
      ? props.theme.colors.darkColor
      : props.theme.colors.lightColor};
  background-color: ${(props) => props.theme.button.submitBackgroundColor};
  border: 2px solid ${(props) => props.theme.button.submitBorderColor};
  border-radius: ${(props) => props.theme.button.borderRadius};
  height: 2rem;
  cursor: pointer;
  padding: ${(props) => props.theme.button.padding};
`;
const ModalBodyContainer = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 60%;
  height: 50%;
  background-color: ${(props) =>
    props.mode === 'dark'
      ? props.theme.colors.darkBackgroundColor
      : props.theme.colors.lightBackgroundColor};
  color: ${(props) =>
    props.mode === 'dark'
      ? props.theme.colors.darkColor
      : props.theme.colors.lightColor};
  box-shadow: 6px 2px 2px rgba(13, 24, 25, 0.5);
  padding: 2rem;
  img {
    width: 8rem;
  }
  #images {
    display: flex;
    align-items: center;
    margin: 1rem;
  }
  #pingerTip {
    font-size: 300%;
    margin: 1rem;
  }
`;
const EditProfileNickName = React.memo(function EditProfileNickNameFnc() {
  const user = authService.currentUser;
  const [newNickName, setNewNickName] = useState(user.displayName);
  const mode = useSelector(selectMode);

  const onChange = React.useCallback(
    (event) => {
      setNewNickName(event.target.value);
    },
    [newNickName]
  );
  const onSubmit = async (event) => {
    event.preventDefault();
    if (user.displayName !== newNickName) {
      await user.updateProfile({
        displayName: newNickName,
      });
      setNewNickName('');
    }
  };

  return (
    <EditProfileNickNameContainer mode={mode}>
      <TableContainer>
        <Table className={'myInfo'} aria-label='myInfo'>
          <TableHead>
            <TableRow>
              <TableCell id='headMyProfile'>
                <h3>내 정보 편집하기</h3>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow id='bodyRow'>
              <TableCell id='myNickName' key={user.displayName}>
                내 별명: <b>{user.displayName}</b>
              </TableCell>
              <TableCell id='editNickName'>
                <form onSubmit={onSubmit}>
                  <div id='nickNameInputSet'>
                    <input
                      value={newNickName}
                      onChange={onChange}
                      type='text'
                      maxLength='20'
                      required
                      id='inputNickName'
                    />
                    <Button mode={mode} type='submit' id='submit' name='submit'>
                      변경하기
                    </Button>
                  </div>
                </form>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </EditProfileNickNameContainer>
  );
});

const EditProfileImageContainer = styled.div`
  min-width: ${(props) => props.theme.deviceSizes.mobileL};
  #changeImageButton {
    border: 1px solid
      ${(props) =>
        props.mode === 'dark'
          ? props.theme.colors.darkBorderColor
          : props.theme.colors.lightBorderColor};
  }
  #myPhotoURL {
    color: ${(props) =>
      props.mode === 'dark'
        ? props.theme.colors.darkColor
        : props.theme.colors.lightColor};
    border: none;
  }
  img {
    width: 7rem;
  }
  .imageContainerCell {
    border: none;
    border-bottom: 1px solid ${(props) => props.theme.colors.darkBorderColor};
  }
  #userImage {
    min-width: 20vw;
  }
`;
const EditProfileImage = React.memo(function EditImage() {
  const user = authService.currentUser;
  const [open, setOpen] = useState(false);
  const userImageAlt = 'user image';
  const mode = useSelector(selectMode);
  const URL = useSelector(selectURL);
  const dispatch = useDispatch();
  const userPhotoURL = authService.currentUser.photoURL;

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const onSubmit = async (event) => {
    event.preventDefault();
    await authService.currentUser.updateProfile({
      photoURL: URL,
    });
    dispatch(setURL(null));
    handleClose();
  };

  const body = (
    <ModalBodyContainer mode={mode}>
      <h2 id='simple-modal-title'>이미지로 자신을 나타내보세요!</h2>
      <div id='images'>
        <img alt={userImageAlt} src={user.photoURL} />
        <span id='pingerTip'>👉</span>
        {!URL && <ImagePlaceHolder />}
        {URL && <img alt={userImageAlt} src={URL} />}
      </div>
      <form onSubmit={onSubmit}>
        <div>
          <SetImageURL />
          <Button mode={mode} type='submit' id='changeUserImage'>
            변경하기
          </Button>
        </div>
      </form>
    </ModalBodyContainer>
  );

  return (
    <EditProfileImageContainer mode={mode}>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell id='myPhotoURL'>
                <h3>내 대표 이미지</h3>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell id='userImage' className='imageContainerCell'>
                <img alt={authService.currentUser.uid} src={userPhotoURL} />
              </TableCell>
              <TableCell className='imageContainerCell'>
                <Button mode={mode} type='button' onClick={handleOpen}>
                  이미지 변경하기
                </Button>
                <Modal
                  id='modal'
                  open={open}
                  onClose={handleClose}
                  aria-labelledby='simple-modal-title'
                  aria-describedby='simple-modal-description'>
                  {body}
                </Modal>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </EditProfileImageContainer>
  );
});

const EditProfile = React.memo(function () {
  return (
    <>
      <EditProfileNickName />
      <EditProfileImage />
    </>
  );
});
export default EditProfile;
