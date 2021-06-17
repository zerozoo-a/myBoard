import React, { useState, Children, useEffect } from 'react';
import styled from 'styled-components';
import { AnimatePresence } from 'framer-motion';
import { Card } from './Card';
const Frame = styled.div`
  width: 100vw;
  height: 100vh;

  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
`;

export const Stack = ({ children, ...props }) => {
  const [stack, setStack] = useState(Children.toArray(children));
  const [select, setSelect] = useState(undefined);

  const pop = (array) => {
    return array.filter((_, index) => {
      return index < array.length - 1;
    });
  };

  const handleVote = () => {
    let newStack = pop(stack);
    setStack(newStack);
  };

  useEffect(() => {
    if (select === undefined) return;
    handleVote();
    setSelect(undefined);
  }, [select]);

  useEffect(() => {
    if (stack.length === 0) {
      setStack(Children.toArray(children));
    }
  });

  return (
    <div>
      <Frame {...props}>
        {stack.map((item, index) => {
          let isTop = index === stack.length - 1;
          return (
            <Card setSelect={setSelect} drag={isTop} key={item.key || index}>
              {item}
            </Card>
          );
        })}
      </Frame>
    </div>
  );
};
