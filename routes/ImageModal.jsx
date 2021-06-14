import React, { useState } from 'react';
import styled from 'styled-components';

const ImageModalContainer = styled.div`
  img {
    position: absolute;
    left: 50%;
    top: 50%;
    width: 95%;
    transform: translate(-50%, -50%);
  }
  div {
    position: fixed;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 100vw;
    height: 100vh;
    background-color: rgba(12, 12, 12, 0.8);
    overflow-y: hidden;
  }
`;

export default function ImageModal({ URL, setIsImageClicked }) {
  const backdropOnClick = () => {
    setIsImageClicked(false);
  };
  return (
    <ImageModalContainer>
      <div onClick={backdropOnClick}>
        <img id='modalImg' alt='원본 이미지' src={URL} />
      </div>
    </ImageModalContainer>
  );
}
