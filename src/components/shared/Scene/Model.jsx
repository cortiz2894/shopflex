import React, { useRef } from 'react';
import { useGLTF, Text, MeshTransmissionMaterial } from '@react-three/drei';
import { useThree, useFrame } from '@react-three/fiber';
import { useControls } from 'leva';

export default function Model(props) {
  const { nodes, materials } = useGLTF('./gltb/404_separate_text.glb');
  const { viewport } = useThree();
  const firstLetter = useRef();
  const secondLetter = useRef();
  const thirdLetter = useRef();

  useFrame(() => {
    firstLetter.current.rotation.z += 0.02;
    secondLetter.current.rotation.z += 0.02;
    thirdLetter.current.rotation.z += 0.02;
  });

  const materialProps = useControls({
    thickness: { value: 0.15, min: 0, max: 3, step: 0.05 },
    roughness: { value: 0.1, min: 0, max: 1, step: 0.1 },
    transmission: { value: 1, min: 0, max: 1, step: 0.1 },
    ior: { value: 1, min: 0, max: 3, step: 0.1 },
    chromaticAberration: { value: 0.43, min: 0, max: 1 },
    backside: { value: true },
  });

  return (
    <group scale={viewport.width / 4} {...props} dispose={null}>
      <Text fontSize={0.55} position={[0, -0.45, -0.5]}>
        Page Not found
      </Text>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.TExt_original.geometry}
        material={nodes.TExt_original.material}
        position={[-0.736, 0, -0.05]}
        rotation={[Math.PI / 2, 0, 0]}
        scale={1.435}
        ref={firstLetter}
      >
        <MeshTransmissionMaterial {...materialProps} />
      </mesh>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.TExt_original001.geometry}
        material={nodes.TExt_original001.material}
        position={[-0.005, -0.007, -0.05]}
        rotation={[Math.PI / 2, 0, 0]}
        scale={1.435}
        ref={secondLetter}
      >
        <MeshTransmissionMaterial {...materialProps} />
      </mesh>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.TExt_original002.geometry}
        material={nodes.TExt_original002.material}
        position={[0.699, 0, -0.05]}
        rotation={[Math.PI / 2, 0, 0]}
        scale={1.435}
        ref={thirdLetter}
      >
        <MeshTransmissionMaterial {...materialProps} />
      </mesh>
    </group>
  );
}

useGLTF.preload('./gltb/404_separate_text.glb');
