import React, { useRef, useEffect } from 'react';
import * as Three from 'three';

const scratchObject3D = new Three.Object3D();

const InstancedPoints = () => {
  const data = new Array(10000).fill(0).map((d, id) => ({ id }));
  const meshRef = useRef();
  const numPoints = data.length;

  useEffect(() => {
    const mesh = meshRef.current;

    for (let i = 0; i < numPoints; ++i) {
      const x = (i % 30) * 1.05;
      const y = Math.floor(i / 30) * 1.05;
      const z = 0;

      scratchObject3D.position.set(x, y, z);
      scratchObject3D.rotation.set(0.5 * Math.PI, 0, 0);
      scratchObject3D.updateMatrix();
      mesh.setMatrixAt(i, scratchObject3D.matrix);
    }
    mesh.instanceMatrix.needsUpdate = true;
  }, [numPoints]);
  return (
    <instancedMesh
      ref={meshRef}
      args={[null, null, numPoints]}
      frustumCulled={false}>
      <cylinderGeometry attach='geometry' args={[0.5, 0.5, 0.15, 32]} />
      <meshStandardMaterial attach='material' color='#fff' />
    </instancedMesh>
  );
};
export default InstancedPoints;
