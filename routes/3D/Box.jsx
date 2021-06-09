import React, { Suspense, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Stars } from '@react-three/drei';
import styled from 'styled-components';

const MashesContainer = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  z-index: -1;
  width: 100%;
  height: 100%;
  background-color: black;
`;
function TorusMesh() {
  const mesh = useRef(null);
  useFrame(() => (mesh.current.rotation.z = mesh.current.rotation.y += 0.01));
  return (
    <mesh position={[0, 0, 0]} ref={mesh} scale={0.1}>
      <torusBufferGeometry attach='geometry' args={[10, 3, 16, 100]} />
      <meshLambertMaterial attach='material' color='#ff9800' />
    </mesh>
  );
}
function CoinMesh() {
  const mesh = useRef(null);
  useFrame(() => (mesh.current.rotation.y = mesh.current.rotation.z += 0.02));
  return (
    <mesh ref={mesh} scale={0.7}>
      <cylinderBufferGeometry args={[1, 1, 0.3, 50]} />
      <meshLambertMaterial attach='material' color='#ff9800' />
    </mesh>
  );
}
function BoxMesh() {
  const mesh = useRef(null);
  useFrame(() => (mesh.current.rotation.x = mesh.current.rotation.y += 0.01));
  return (
    <mesh ref={mesh}>
      <boxBufferGeometry attach='geometry' />
      <meshLambertMaterial attach='material' color='#525252' />
    </mesh>
  );
}
export default function Meshes() {
  return (
    <>
      <MashesContainer>
        <Canvas camera={{ position: [-5, 2, 10], fov: 60 }}>
          <mesh>
            <OrbitControls />
            <Stars />
            {/* <BoxMesh /> */}
            <CoinMesh />
            <TorusMesh position={[5, 1, -2]} />
            <ambientLight color='#121212' intensity={0.1} />
            <spotLight position={[10, 15, 20]} angle={0.3} />
            <hemisphereLight
              color='#eeeeee'
              skyColor='#fffbbb'
              groundColor='#f5f5f5'
              intensity={0.8}
            />
          </mesh>
        </Canvas>
        <Suspense fallback={<div>Loading...</div>}></Suspense>
      </MashesContainer>
    </>
  );
}
