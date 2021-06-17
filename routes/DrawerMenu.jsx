import React, { useState, useEffect } from 'react';
import Drawer from '@material-ui/core/Drawer';
import { Menu } from '@styled-icons/entypo/Menu';
import { useSelector } from 'react-redux';
import { selectIsOnline } from '../store/userReducer';
import styled from 'styled-components';
const DrawerContainer = styled.div`
  #drawer {
    .MuiPaper-root,
    .MuiDrawer-paper {
      background-color: rgba(0, 0, 0, 0);
      box-shadow: 0.5rem 0.07rem 0rem rgba(22, 22, 22, 0.28);
    }
  }
`;
const DrawerBtn = styled.button`
  min-width: ${(props) => props.theme.interval.small};
  background-color: ${(props) => props.theme.button.pointColor};
  color: ${(props) => props.theme.button.submitColor};
  border: 2px solid ${(props) => props.theme.button.pointBorder};
  border-radius: 5px;
  cursor: pointer;
  padding: ${(props) => props.theme.button.paddingSmall};
  margin: 0;
  font-size: ${(props) => props.theme.button.fontSize};
`;

// children = Nav file
export default function DrawerMenu({ children }) {
  const [drawerState, setDrawerState] = useState(false);
  const [drawerPermanent, setDrawerPermanent] = useState(false);
  const toggleDrawer = (open) => (e) => {
    setDrawerState(open);
  };
  let isOnline = useSelector(selectIsOnline);
  const eventCallBack = () => {
    if (window.innerWidth > 1642) {
      setDrawerPermanent(true);
    } else {
      setDrawerPermanent(false);
    }
  };
  useEffect(() => {
    if (window.innerWidth > 1642) {
      setDrawerPermanent(true);
    }
    window.addEventListener('resize', eventCallBack);
    return () => {
      window.removeEventListener('resize', eventCallBack);
    };
  }, []);
  return (
    <DrawerContainer>
      {isOnline && (
        <div>
          {!drawerPermanent && (
            <DrawerBtn id='drawerBtn' onClick={toggleDrawer(true)}>
              <Menu size='30' />
            </DrawerBtn>
          )}
          <Drawer
            variant={drawerPermanent ? 'permanent' : null}
            id='drawer'
            anchor={'left'}
            open={drawerState}
            onClose={toggleDrawer(false)}>
            {children}
          </Drawer>
        </div>
      )}
    </DrawerContainer>
  );
}
