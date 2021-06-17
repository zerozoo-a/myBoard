import React, { useState, useEffect, Children } from 'react';
import { Framer, useMotionValue, useTransform, useAnimation } from 'framer';
import { motion } from 'framer-motion';
import styled from 'styled-components';
import { Stack } from './Stack';

export default function Deck() {
  const Wrapper = styled(Stack)``;
  // Card's parent
  const Item = styled(motion.div)`
    background-color: white;
    width: 200px;
    height: 250px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 80px;
    text-shadow: 0 10px 10px #d1d5db;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.15);
    border-radius: 8px;
    transform: ${() => {
      let rotation = Math.random() * (5 - -5) + -5;
      return `rotate(${rotation}deg)`;
    }};
  `;
  return (
    <div>
      <Wrapper>
        <Item>🥳</Item>
        <Item>🎂</Item>
        <Item>🍥</Item>
      </Wrapper>
    </div>
  );
}

// const Wrapper = styled.div` //   display: flex;
//   z-index: 1;
// `;
// export function Fistful() {
//   const scaleLeft = useMotionValue(1);
//   return (
//     <Wrapper>
//       <motion.div
//         style={{ scale: scaleLeft }}
//         animate={{
//           scale: [1, 0.5, 2],
//           transition: {
//             times: [0, 0.5, 1],
//             yoyo: Infinity,
//           },
//         }}>
//         👊
//       </motion.div>
//       <motion.div style={{ scale: scaleLeft }}>😝</motion.div>
//       <motion.div style={{ scaleX: -1, scale: scaleLeft }}>👊</motion.div>
//     </Wrapper>
//   );
// }
// export default function Cards() {
//   return <Fistful />;
// }
