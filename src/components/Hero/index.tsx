'use client'

import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import Image from "next/image";
import { useEffect, useRef } from "react";
import InfiniteText from "./InfiniteText/index";
import InstagramCard from "./InstagramCard";
import styles from './Hero.module.scss'

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
	const imageRef = useRef(null);
	const heroRef = useRef(null);

  useEffect(() => {
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
  }, []);

  return (
    <div className="h-[80vh] w-full header-overlay overflow-hidden relative hero" ref={heroRef}>
      <Image 
        src={`/images/bg-shopflex.jpg`}
        layout='fill'
        objectFit='cover'
        alt='clothes'
        className=''
        ref={imageRef}
      />
      <a href='https://google.com'>
        <InstagramCard 
          videoMp4Src="/videos/instagram_reel.mp4" 
          videoWebmSrc="/videos/instagram_reel.webm" 
          videoPoster="/images/instagram_reel.png" 
          triggerElement={heroRef.current}
        />
      </a>
      <InfiniteText text="Embrace the technology - " />
    </div>
  );
}
