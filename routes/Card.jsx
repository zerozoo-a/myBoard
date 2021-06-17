import React, { useRef, useEffect, useState } from 'react';
import {
  motion,
  useMotionValue,
  useAnimation,
  useTransform,
} from 'framer-motion';
import styled from 'styled-components';

const StyledCard = styled(motion.div)`
  position: absolute;
`;

export const Card = ({ children, setSelect, ...props }) => {
  const cardEl = useRef(null);
  const x = useMotionValue(0);
  const controls = useAnimation();

  const [constrained, setConstrained] = useState(true);
  const [direction, setDirection] = useState();
  const [velocity, setVelocity] = useState();

  const getDirection = () => {
    return velocity >= 1 ? 'right' : velocity <= -1 ? 'left' : undefined;
  };
  const getTrajectory = () => {
    setVelocity(x.getVelocity());
    console.log('velocity: ', x.getVelocity());
    // 속도를 구함 속도가 +인 경우 오른쪽 아니면 왼쪽
    setDirection(getDirection());
    // 방향을 구함 속도를 구했으므로 구할 수 있음
  };
  const flyAway = (min) => {
    const flyAwayDistance = (direction) => {
      const parentWidth =
        cardEl.current.parentNode.getBoundingClientRect().width;
      const childWidth = cardEl.current.getBoundingClientRect().width;
      return direction === 'left'
        ? -parentWidth / 2 - childWidth / 2
        : parentWidth / 2 + childWidth / 2;
    };

    if (direction && Math.abs(velocity) > min) {
      setConstrained(false);
      direction === 'left' ? setSelect(false) : setSelect(true);
      console.log('distance', flyAwayDistance(direction));
      controls.start({
        // x: flyAwayDistance(direction),
        x: 10,
        opacity: 0,
      });
    }
  };

  //       onDragEnd={() => flyAway(500)}
  return (
    <StyledCard
      animate={controls}
      dragConstraints={constrained && { left: 0, right: 0, top: 0, bottom: 0 }}
      ref={cardEl}
      style={{ x }}
      onDragEnd={function (_, info) {
        if (Math.abs(info.point.x) < 100) {
          controls.start({ x: 0 });
        } else {
          controls.start({ x: info.point.x < 0 ? -200 : 200 });
          setSelect(true);
          setConstrained(true);
        }
      }}
      whileTap={{ scale: 1.1 }}
      {...props}>
      {children}
    </StyledCard>
  );
};

//       onDrag={getTrajectory}
//   const getVote = (childNode, parentNode) => {
//     const childRect = childNode.getBoundingClientRect();
//     const parentRect = parentNode.getBoundingClientRect();

//     let result =
//       parentRect.left >= childRect.right
//         ? false
//         : parentRect.right <= childRect.left
//         ? true
//         : undefined;
//     return result;
//   };

//   useEffect(() => {
//     const unsubscribeX = x.onChange(() => {
//       const childNode = cardElem.current;
//       const parentNode = cardElem.current.parentNode;
//       set
//     });
//     return () => unsubscribeX();
//   });
