'use client'

import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";
import styles from './InfiniteText.module.scss'
import classNames from "classnames";

gsap.registerPlugin(ScrollTrigger);

type Props = {
    text: string,
	size?: 'small'| 'medium'
}

export default function InfiniteText({text, size = 'medium'}: Props) {

	const firstText = useRef(null);
	const secondText = useRef(null);
	const slider = useRef(null);

	let xPercent = 0;
	let direction = -1;

  useEffect( () => {

    gsap.to(slider.current, {
		  scrollTrigger: {
		    trigger: document.documentElement,
		    scrub: 0.5,
		    start: 0,
		    end: window.innerHeight,
		    onUpdate: e => direction = e.direction * -1
		  },
		  x: "-500px",
		})
		
		requestAnimationFrame(animate);	  
  }, [])

  const animate = () => {
		if(xPercent < -100){
		  xPercent = 0;
		}
		else if(xPercent > 0){
		  xPercent = -100;
		}

		gsap.set(firstText.current, {xPercent: xPercent})
		gsap.set(secondText.current, {xPercent: xPercent})
		requestAnimationFrame(animate);
		xPercent += 0.1 * direction;
  }

  return (
		<div className={classNames(styles.sliderContainer, [styles[size]])}>
			<div ref={slider} className={styles.slider}>
				<p ref={firstText} >{text}</p>
				<p ref={secondText}>{text}</p>
			</div>
		</div>
  );
}
