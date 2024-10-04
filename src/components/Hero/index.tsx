'use client';

import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import Image from 'next/image';
import { useEffect, useRef } from 'react';
import InfiniteText from './InfiniteText/index';
import InstagramCard from './InstagramCard';
import Draggable from 'gsap/Draggable';
import styles from './Hero.module.scss';
import classNames from 'classnames';
import { useLoaderStore } from '@/store/loaderStore';
import useDeviceType from '@/hooks/useDeviceType';

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const imageRef = useRef(null);
  const heroRef = useRef(null);
  const cardRef = useRef<HTMLAnchorElement | null>(null);
  const isLoading = useLoaderStore((state) => state.isLoading);
  const textRef = useRef<HTMLDivElement | null>(null);

  const isMobile = useDeviceType();

  useEffect(() => {
    if (!heroRef.current || !textRef.current || !imageRef.current) return;
    if (!isLoading) {
      gsap.to(heroRef.current, {
        y: 0,
        ease: 'hop',
        duration: 0.5,
      });
      gsap.to(imageRef.current, {
        scale: 1,
        ease: 'hop',
        duration: 1.2,
      });
      gsap.to(textRef.current, {
        y: isMobile ? '60vh' : 0,
        ease: 'hop',
        delay: 0.5,
      });
    }
  }, [isLoading]);

  useEffect(() => {
    gsap.registerPlugin(Draggable);

    gsap.to(imageRef.current, {
      scrollTrigger: {
        trigger: document.documentElement,
        scrub: 0.5,
        start: 'top top',
        end: 'bottom top',
      },
      yPercent: 50,
      ease: 'none',
    });

    if (!cardRef.current || !heroRef.current) return;

    Draggable.create(cardRef.current, {
      bounds: heroRef.current,
    });
  }, []);

  return (
    <div
      className={classNames('h-[80vh] w-full header-overlay overflow-hidden relative hero', [styles.hero])}
      ref={heroRef}
    >
      <Image
        src={`/images/bg-shopflex.jpg`}
        layout="fill"
        objectFit="cover"
        alt="clothes"
        className=""
        ref={imageRef}
      />
      {!isMobile && (
        <a href="https://google.com" target={'_blank'} ref={cardRef} className="absolute z-[99999]">
          <InstagramCard
            videoMp4Src="/videos/instagram_reel.mp4"
            videoWebmSrc="/videos/instagram_reel.webm"
            videoPoster="/images/instagram_reel.png"
            triggerElement={heroRef.current}
          />
        </a>
      )}
      <div ref={textRef} className={styles.text}>
        <div className="relative md:h-auto h-[13vh]">
          <InfiniteText text="Embrace the technology - " controls={true} />
        </div>
        {isMobile && (
          <div className="relative md:h-auto h-[13vh]">
            <InfiniteText text="Embrace the technology - " controls={true} direction="right" />
          </div>
        )}
      </div>
    </div>
  );
}
