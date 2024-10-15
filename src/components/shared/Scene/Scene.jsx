'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import Model from './Model';
import { Environment } from '@react-three/drei';
import { useControls } from 'leva';
import styles from './Scene.module.scss';
import { Leva } from 'leva';

export default function Scene() {
  const lightProps = useControls({
    intensity: { value: 1.35, min: 0, max: 10, step: 0.05 },
    positionY: { value: 0, min: -10, max: 10, step: 0.1 },
    positionX: { value: -0.3, min: -10, max: 10, step: 0.1 },
    positionZ: { value: -1.9, min: -10, max: 10, step: 0.1 },
  });

  return (
    <>
      <div className={styles.blurElement}></div>
      <Leva hidden />
      <Canvas style={{ backgroundColor: 'transparent' }}>
        <directionalLight
          intensity={lightProps.intensity}
          position={[lightProps.positionY, lightProps.positionX, lightProps.positionZ]}
        />
        <Environment preset="city" />
        <Model />
      </Canvas>
    </>
  );
}
