'use client'
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useLayoutEffect, useRef, useState } from "react";
import classNames from "classnames";
import styles from './SectionTitle.module.scss'

interface Props {
    text: string,
    position?: 'center' | 'left' | 'right',
    size?: 'small' | 'medium' | 'large'
}

gsap.registerPlugin(ScrollTrigger);


export default function SectionTitle({ text, position = 'left', size = 'medium' }:Props) {
	const lineRef = useRef<HTMLDivElement>(null)

	useLayoutEffect(() => {
        gsap.fromTo(
            lineRef.current,
            { 
                width: 0
            },
            {
                width: '100%', 
                duration: 1,
                scrollTrigger: lineRef.current
            }
        );
    }, []);

  return (
        <div className={classNames("relative flex items-center md:mt-[2rem] md:mb-[5rem] mb-4 mt-4", [styles[position],])}>
            <h2 className={classNames("text-standar-darker", [styles.title], [styles[size]])}>{text}</h2>
            <div ref={lineRef} className={styles.line}></div>
        </div>
  );
}
