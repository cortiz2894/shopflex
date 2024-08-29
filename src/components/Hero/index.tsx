'use client'

import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import Image from "next/image";
import { useEffect, useRef } from "react";
import InfiniteText from "./InfiniteText/index";
import InstagramCard from "./InstagramCard";
import Draggable from "gsap/Draggable";

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
	const imageRef = useRef(null);
	const heroRef = useRef(null);
  const cardRef = useRef<HTMLAnchorElement | null>(null)

  useEffect(() => {
    gsap.registerPlugin(Draggable)

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

    if(!cardRef.current) return

    Draggable.create(cardRef.current, {
      bounds: '.hero',
    });

  }, []);

  return (
    <div 
      className="h-[80vh] w-full header-overlay overflow-hidden relative hero" 
      ref={heroRef}
      data-cursor-exclusion
      >
      <Image 
        src={`/images/bg-shopflex.jpg`}
        layout='fill'
        objectFit='cover'
        alt='clothes'
        className=''
        ref={imageRef}
      />
      <a href='https://google.com' target={'_blank'} ref={cardRef} className='absolute z-[99999]'>
        <InstagramCard 
          videoMp4Src="/videos/instagram_reel.mp4" 
          videoWebmSrc="/videos/instagram_reel.webm" 
          videoPoster="/images/instagram_reel.png" 
          triggerElement={heroRef.current}
        />
      </a>
      <InfiniteText text="Embrace the technology - " controls={true}/>
    </div>
  );
}
