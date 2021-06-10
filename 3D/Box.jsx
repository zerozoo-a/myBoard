import * as THREE from 'three';
import React, { Suspense, useRef, useMemo } from 'react';
import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import { OrbitControls, Stars, useGLTF } from '@react-three/drei';
import { Physics, usePlane, useSphere } from '@react-three/cannon';
import styled from 'styled-components';
import Model from '../Scene.js';
console.log(Model);
const MashesContainer = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  z-index: -1;
  width: 100%;
  height: 100%;
  background-color: black;
`;

function Duck() {
  const mesh = useRef(null);
  useFrame(() => (mesh.current.rotation.y = mesh.current.rotation.y += 0.007));
  return (
    <mesh ref={mesh} position={[15, -2, 0]} scale={0.03}>
      <Model />
    </mesh>
  );
}
export default function Meshes() {
  return (
    <>
      <MashesContainer>
        <Canvas
          sRGB
          shadowMap
          colorManagement
          gl={{ alpha: false }}
          camera={{ position: [-10, 10, 20], fov: 60 }}>
          <ambientLight color='#121212' intensity={0.1} />
          <spotLight position={[28, 25, 20]} angle={0.3} />
          <hemisphereLight
            color='#eeeeee'
            skyColor='#fffbbb'
            groundColor='#f5f5f5'
            intensity={0.8}
          />
          <mesh position={[0, 35, 35]}></mesh>

          <OrbitControls />
          <Stars />
          <Suspense fallback={null}>
            <Duck />
          </Suspense>
        </Canvas>
      </MashesContainer>
    </>
  );
}

// function TorusMesh() {
//   const mesh = useRef(null);
//   useFrame(() => (mesh.current.rotation.z = mesh.current.rotation.y += 0.01));
//   return (
//     <mesh position={[0, 0, 5]} ref={mesh} scale={0.1}>
//       <torusBufferGeometry attach='geometry' args={[10, 3, 16, 100]} />
//       <meshLambertMaterial attach='material' color='#ff9800' />
//     </mesh>
//   );
// }

// function Plane({ color, ...props }) {
//   const [ref] = usePlane(() => ({ ...props }));
//   return (
//     <mesh ref={ref} receiveShadow>
//       <planeBufferGeometry attach='geometry' args={[10, 10]} />
//       <meshPhongMaterial attach='material' color={color} />
//     </mesh>
//   );
// }

// function SphereMesh({ number = 100 }) {
//   const map = useLoader(THREE.TextureLoader, carbonTexture);
//   const [ref] = useSphere((index) => ({
//     mass: 1,
//     position: [Math.random() - 0.5, Math.random() - 0.5, index * 2],
//     args: 1,
//   }));
//   const colors = useMemo(() => {
//     const array = new Float32Array(number * 3);
//     const color = new THREE.Color();
//     for (let i = 0; i < number; i++)
//       color
//         .set(niceColors[17][Math.floor(Math.random() * 5)])
//         .convertSRGBToLinear()
//         .toArray(array, i * 3);
//     return array;
//   }, [number]);
//   return (
//     <instancedMesh
//       ref={ref}
//       castShadow
//       receiveShadow
//       args={[null, null, number]}>
//       <sphereBufferGeometry attach='geometry' args={[1, 16, 16]}>
//         <instancedBufferAttribute
//           attachObject={['attributes', 'color']}
//           args={[colors, 3]}
//         />
//       </sphereBufferGeometry>
//       <meshPhongMaterial
//         attach='material'
//         vertexColors={THREE.VertexColors}
//         normalMap={map}
//         normalScale={[1, 1]}
//         normalMap-wrapS={THREE.RepeatWrapping}
//         normalMap-wrapT={THREE.RepeatWrapping}
//         normalMap-repeat={[10, 10]}
//       />
//     </instancedMesh>
//   );
// }

// function BoxMesh() {
//   const mesh = useRef(null);
//   useFrame(() => (mesh.current.rotation.x = mesh.current.rotation.y += 0.01));
//   return (
//     <mesh ref={mesh}>
//       <boxBufferGeometry attach='geometry' />
//       <meshLambertMaterial attach='material' color='#525252' />
//     </mesh>
//   );
// }
