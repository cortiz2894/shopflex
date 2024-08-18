'use client'

import VideoPlayer from "@/components/shared/VideoPlayer/index";
import gsap from "gsap";
import { useEffect, useRef } from "react";
import styles from './InstagramCard.module.scss'
import { AiFillHeart, AiOutlineInstagram } from "react-icons/ai";

interface InstagramCardProps {
  className?: string;
  videoMp4Src: string;
  videoWebmSrc: string;
  videoPoster: string;
  triggerElement: HTMLElement | null;
}

export default function InstagramCard({ className, videoMp4Src, videoWebmSrc, videoPoster,triggerElement }: InstagramCardProps) {
    const cardIgRef = useRef(null);
    const hoverTimeline = useRef<gsap.core.Timeline | null>(null);
    const heartContainerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if(!cardIgRef.current) return
    setTimeout(() => {
        gsap.timeline()
        .to(cardIgRef.current, {
            top: '30vh',
            ease: 'Power4.InOut',
            opacity: 1,
            duration: 0.5
        })
        .to(cardIgRef.current, {
            rotation: 2,
            x: '5vw',
            y: '35vh',
            scrollTrigger: {
            trigger: triggerElement,
            start: 'top top',
            end: "bottom top", 
            scrub: 0.2,
            }
        }, '>');
    }, 4500);

    hoverTimeline.current = gsap.timeline({ paused: true })
      .to(cardIgRef.current, {
        scale: 1.1,
        ease: "elastic.out(1,0.3)",
        duration: 0.7,
      });
    }, []);

    const handleMouseEnter = () => {
        if (!hoverTimeline.current) return;
        hoverTimeline.current.play();
    
        const numHearts = 10;
        const heartClones = [];

        const heartClone = heartContainerRef.current?.querySelector('svg')?.cloneNode(true) as HTMLElement;

        for (let i = 0; i < numHearts; i++) {
          if (heartClone) {
                const heartClone = heartContainerRef.current?.querySelector('svg')?.cloneNode(true) as HTMLElement;
                heartClone.style.position = 'absolute';
                // heartClone.style.left = `${Math.random() * 100}%`;
                heartClone.style.left = '0px';
                heartClone.style.top = '0px';
                heartContainerRef.current?.appendChild(heartClone);
                heartClones.push(heartClone);
            }
        }
        gsap.to(heartClones, {
            x: () => (Math.random() - 0.5) * 100,
            y: -100,
            // scale: Math.random() * 0.5 + 0.5,
            opacity: 0,
            duration: 0.8,
            stagger: 0.12,
            ease: "power2.out",
            onComplete() {
                if (!heartContainerRef.current) return
                heartContainerRef.current.innerHTML = ''
                heartContainerRef.current.appendChild(heartClone);
            }
        });
      };

	const handleMouseLeave = () => {
		if(!hoverTimeline.current) return;
		hoverTimeline.current.reverse();
	};

  return (
    <figure 
      className={`${styles.instagramCard} ${className}`} 
      ref={cardIgRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className={styles.videoContainer}>
        <VideoPlayer 
          mp4Src={videoMp4Src} 
          webmSrc={videoWebmSrc} 
          poster={videoPoster}
          className={styles.customVideoPlayer}
          autoplay
          controls={false}
          loop
        />
      </div>
      <figcaption>
        <span>@shopflex.ecommerce</span>
        <div className="flex gap-1">
            <div className="relative" ref={heartContainerRef}>
                <AiFillHeart style={{color: 'red', fontSize: 24}} />
            </div>
            <span>400</span>
        </div>
        <AiOutlineInstagram 
          className={styles.brandLogo}
        />
    </figcaption>
    </figure>
  );
}
