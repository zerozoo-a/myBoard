import React from 'react';
import { Canvas } from '@react-three/fiber';
import * as Three from 'three';
import Controls from './Controls';
import InstancedPoints from './InstancedPoints';

const ThreeMash = () => {
  return (
    <Canvas camera={{ position: [0, 0, 5] }}>
      <Controls />
      <ambientLight color='#eeeeee' intensity={0.1} />
      <hemisphereLight
        color='#eeeeee'
        skyColor='#fffbbb'
        groundColor='#090909'
        intensity={0.8}
      />
      <InstancedPoints />
    </Canvas>
  );
};

export default ThreeMash;
