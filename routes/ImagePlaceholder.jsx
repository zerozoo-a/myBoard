import React from 'react';
import styled from 'styled-components';

const PlaceHolder = styled.div`
  background-color: ${(props) => props.theme.colors.grey500};
  width: 8rem;
  height: 8rem;
  opacity: 0.1;
  transition: opacity 0.12s ease-in-out;
`;
export default function ImagePlaceHolder() {
  return <PlaceHolder />;
}
