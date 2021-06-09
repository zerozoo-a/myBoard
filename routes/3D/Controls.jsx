import React from 'react';
import { extend, useThree, useFrame } from '@react-three/fiber';
import { TrackballControls } from 'three/examples/jsm/controls/TrackballControls';
import * as Three from 'three';

extend({ TrackballControls });

const ALT_KEY = 18;
const CTRL_KEY = 17;
const CMD_KEY = 91;

const Controls = ({}) => {
  const controls = React.useRef();
  const { camera, gl } = useThree();

  useFrame(() => {
    controls.current.update();
  });

  return (
    <trackballControls
      ref={controls}
      args={[camera, gl.domElement]}
      dynamicDampingFactor={0.1}
      keys={[
        ALT_KEY, // orbit
        CTRL_KEY, // zoom
        CMD_KEY, // pan
      ]}
      mouseButtons={{
        LEFT: Three.MOUSE.PAN,
        MIDDLE: Three.MOUSE.ZOOM,
        RIGHT: Three.MOUSE.ROTATE,
      }}
    />
  );
};

export default Controls;
