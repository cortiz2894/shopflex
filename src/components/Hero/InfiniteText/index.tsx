'use client'

import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";
import styles from './InfiniteText.module.scss'
import classNames from "classnames";

gsap.registerPlugin(ScrollTrigger);

type Props = {
  text: string,
  size?: 'small' | 'medium',
  position?: 'hero' | 'bottom',
  controls?: boolean,
  direction?: 'left' | 'right'
}

export default function InfiniteText({ text, size = 'medium', position = 'hero', controls = false, direction = 'left' }: Props) {

  const firstText = useRef(null);
  const secondText = useRef(null);
  const slider = useRef(null);

  let xPercent = 0;
  let scrollDirection = direction === 'left' ? -1 : 1;

  useEffect(() => {
    if (!slider.current) return;

    if (controls) {
      gsap.to(slider.current, {
        scrollTrigger: {
          trigger: document.documentElement,
          scrub: 0.5,
          start: 0,
          end: window.innerHeight,
          onUpdate: e => scrollDirection = direction === 'left' ? e.direction * -1 : e.direction * 1  // Ajuste de la dirección basado en el scroll
        },
        x: direction === 'left' ? "-500px" : "500px",  // Movimiento inicial
      });
    }

    requestAnimationFrame(animate);
  }, [controls, direction]);

  const animate = () => {
    if (!firstText.current || !secondText.current) return;

    if (xPercent < -100) {
      xPercent = 0;
    } else if (xPercent > 0) {
      xPercent = -100;
    }

    gsap.set(firstText.current, { xPercent: xPercent });
    gsap.set(secondText.current, { xPercent: xPercent });

    requestAnimationFrame(animate);
    xPercent += 0.1 * scrollDirection;
  };

  return (
    <div className={classNames(styles.sliderContainer, [styles[size]], [styles[position]])}>
      <div ref={slider} className={styles.slider}>
        <p ref={firstText}>{text}</p>
        <p ref={secondText}>{text}</p>
      </div>
    </div>
  );
}
