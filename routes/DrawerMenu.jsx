import React, { useState } from 'react';
import Drawer from '@material-ui/core/Drawer';
import { makeStyles } from '@material-ui/core';
import { Menu } from '@styled-icons/entypo/Menu';
import { useSelector } from 'react-redux';
import { selectIsOnline } from '../store/userReducer';
import { selectMode } from '../store/userReducer';
import styled from 'styled-components';

const DrawerContainer = styled.div`
  margin-bottom: 2rem;
`;
const DrawerBtn = styled.button`
  min-width: ${(props) => props.theme.interval.small};
  min-height: ${(props) => props.theme.interval.small};
  background-color: ${(props) => props.theme.button.pointColor};
  color: ${(props) => props.theme.button.submitColor};
  border: 2px solid ${(props) => props.theme.button.pointBorder};
  border-radius: 5px;
  cursor: pointer;
  padding: ${(props) => props.theme.button.paddingSmall};
  margin: ${(props) => props.theme.button.marginSmall};
  font-size: ${(props) => props.theme.button.fontSize};
`;

// children = Nav file
export default function DrawerMenu({ children }) {
  const [drawerState, setDrawerState] = useState(false);
  // const classes = useStyles();
  const toggleDrawer = (open) => (e) => {
    setDrawerState(open);
  };
  const mode = useSelector(selectMode);
  console.log('mode in drawerMenu', mode);
  let isOnline = useSelector(selectIsOnline);
  return (
    <div>
      {isOnline && (
        <DrawerContainer>
          <div>
            <DrawerBtn id='drawerBtn' onClick={toggleDrawer(true)}>
              <Menu size='30' />
            </DrawerBtn>
            <Drawer
              id='drawer'
              anchor={'left'}
              open={drawerState}
              onClose={toggleDrawer(false)}>
              {children}
            </Drawer>
          </div>
        </DrawerContainer>
      )}
    </div>
  );
}
