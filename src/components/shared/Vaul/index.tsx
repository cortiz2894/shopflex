'use client';

import { useQuickAddStore } from '@/store/quickAddStore';
import { useGSAP } from '@gsap/react';
import classNames from 'classnames';
import gsap from 'gsap';
import Draggable from 'gsap/Draggable';

import { ReactNode, useEffect, useRef, useState } from 'react';
import styles from './Vaul.module.scss';

gsap.registerPlugin(Draggable);

interface VaulProps {
  content: ReactNode;
  show: string;
}

export const Vaul = ({ content, show }: VaulProps) => {
  const { setSlug } = useQuickAddStore();

  const vaulRef = useRef<HTMLDivElement | null>(null);
  const overlayRef = useRef<HTMLDivElement | null>(null);

  useGSAP(() => {
    Draggable.create(vaulRef.current, {
      type: 'y',
      onRelease: function () {
        if (this.y > window.innerHeight / 2) {
          removeAnimation();
        } else gsap.to(this.target, { y: 0, duration: 0.2 });
      },
    });
  }, []);

  useEffect(() => {
    if (show !== '') {
      playAnimation();
      setSlug('');
    }
  }, [show]);

  const playAnimation = () => {
    gsap.to(vaulRef.current, {
      y: 0,
      opacity: 1,
      ease: 'M0,0 C0.5,0 0.5,1 1,1',
      duration: 0.2,
    });
    gsap.to(overlayRef.current, {
      pointerEvents: 'all',
      ease: 'hop',
      duration: 0.2,
      backgroundColor: 'rgba(42, 41, 47, 0.5)',
      backdropFilter: 'blur(10px)',
    });
  };

  const removeAnimation = () => {
    gsap.to(overlayRef.current, {
      backgroundColor: 'transparent',
      ease: 'hop',
      duration: 0.2,
      backdropFilter: 'blur(0px)',
      pointerEvents: 'none',
    });
    gsap.to(vaulRef.current, {
      y: '90vh',
      ease: 'M0,0 C0.5,0 0.5,1 1,1',
      duration: 0.2,
    });
  };

  return (
    <>
      <div className={classNames(styles.root)} ref={overlayRef} onClick={removeAnimation}></div>
      <div className={styles.vaul} ref={vaulRef}>
        {content}
      </div>
    </>
  );
};

export default Vaul;
