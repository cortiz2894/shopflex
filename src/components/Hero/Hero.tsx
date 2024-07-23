'use client'

import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import Image from "next/image";
import { useEffect, useRef } from "react";

export default function Hero() {
	
	const firstText = useRef(null);
	const secondText = useRef(null);
	const slider = useRef(null);

	let xPercent = 0;

	let direction = -1;



  useEffect( () => {

    gsap.registerPlugin(ScrollTrigger);

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
      <div className="h-[80vh] w-full header-overlay overflow-hidden relative hero">
          <Image 
            src={`/images/bg-shopflex.jpg`}
            layout='fill'
            objectFit='cover'
            alt='clothes'
						className=''
          />
            <div className={'sliderContainer'}>
							<div ref={slider} className={'slider'}>
                <p ref={firstText}>Shopflex Hero -</p>
                <p ref={secondText}>Shopflex Hero -</p>
							</div>
						</div>
      </div>
  );
}
