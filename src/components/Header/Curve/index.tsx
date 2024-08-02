import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { CustomEase } from 'gsap/CustomEase';

gsap.registerPlugin(CustomEase);

type Props = {
    active: boolean
}

export default function Curve({active}: Props) {
  const pathRef = useRef(null);

  const initialPath = `M100 0 L200 0 L200 ${window.innerHeight} L100 ${window.innerHeight} Q-100 ${window.innerHeight / 2} 100 0`;
  const targetPath = `M100 0 L200 0 L200 ${window.innerHeight} L100 ${window.innerHeight} Q100 ${window.innerHeight / 2} 100 0`;

  useEffect(() => {
    CustomEase.create("customEase", "M0,0 C0.76,0 0.24,1 1,1");

    const animatePath = (path:string) => {
      gsap.to(pathRef.current, {
        attr: { d: path },
        duration: 0.8,
        ease: 'customEase'
      });
    };

    active ? animatePath(targetPath) : animatePath(initialPath);

  }, [active]);

  return (
    <svg className={'svgCurve'}>
      <path ref={pathRef} d={initialPath}></path>
    </svg>
  );
}
