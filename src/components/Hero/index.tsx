'use client'

import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import Image from "next/image";
import { useEffect, useRef } from "react";
import InfiniteText from "./InfiniteText/index";

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
	const imageRef = useRef(null);

  useEffect( () => {
	gsap.to(imageRef.current, {
		scrollTrigger: {
			trigger: document.documentElement,
			scrub: 0.5,
			start: "top top",
			end: "bottom top",
		},
		yPercent: 50,
		ease: "none",
		});
  }, [])

  return (
      <div className="h-[80vh] w-full header-overlay overflow-hidden relative hero">
				<Image 
					src={`/images/bg-shopflex.jpg`}
					layout='fill'
					objectFit='cover'
					alt='clothes'
					className=''
					ref={imageRef}
				/>
				<InfiniteText text="Some text in here -"/>
			</div>
  );
}
