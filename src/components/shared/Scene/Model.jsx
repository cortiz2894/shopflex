import React, { useRef, useEffect } from 'react';
import { useGLTF, Text, MeshTransmissionMaterial, Html } from '@react-three/drei';
import { useThree, useFrame } from '@react-three/fiber';
import { useControls } from 'leva';
import gsap from 'gsap';

export default function Model(props) {
  const { nodes, materials } = useGLTF('./gltb/404_separate_text.glb');
  const { viewport } = useThree();
  const firstLetter = useRef();
  const secondLetter = useRef();
  const thirdLetter = useRef();
  const meshGroup = useRef();

  useFrame(({ mouse }) => {
    const x = mouse.x * viewport.width * 0.008;
    const y = mouse.y * viewport.height * 0.008;
    meshGroup.current.position.set(x, y, 0);
  });

  const materialProps = useControls({
    thickness: { value: 0.1, min: 0, max: 3, step: 0.05 },
    roughness: { value: 0.1, min: 0, max: 1, step: 0.1 },
    transmission: { value: 1, min: 0, max: 1, step: 0.1 },
    ior: { value: 0.5, min: 0, max: 3, step: 0.1 },
    chromaticAberration: { value: 0.43, min: 0, max: 1 },
    backside: { value: true },
  });

  useEffect(() => {
    gsap.fromTo(meshGroup.current.scale, { x: 3, y: 3, z: 3 }, { x: 1, y: 1, z: 1, duration: 1, ease: 'hop' });

    meshGroup.current.children.forEach((child) => {
      if (child.material) {
        child.material.transparent = true;
        gsap.fromTo(child.material, { opacity: 0 }, { opacity: 1, duration: 2, ease: 'power2.out' });
      }
    });
  }, []);

  return (
    <group scale={viewport.width / 4} {...props} dispose={null}>
      <Text fontSize={0.3} position={[0, -0.45, -0.5]}>
        Page Not found
      </Text>
      <Text fontSize={0.1} position={[0, -0.8, -0.5]}>
        Sorry we couldn't find the page you looking for
      </Text>
      <group ref={meshGroup}>
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
    </group>
  );
}

useGLTF.preload('./gltb/404_separate_text.glb');
