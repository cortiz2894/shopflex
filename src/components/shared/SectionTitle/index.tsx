'use client'
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useLayoutEffect, useRef, useState } from "react";
import classNames from "classnames";
import styles from './SectionTitle.module.scss'

interface Props {
    text: string,
    position?: 'center' | 'left' | 'right'
}

gsap.registerPlugin(ScrollTrigger);


export default function SectionTitle({ text, position = 'left' }:Props) {
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
        <div className={classNames("relative flex items-center mt-[2rem] mb-[5rem]", [styles[position]])}>
            <h2 className={classNames("text-standar-darker", [styles.title])}>{text}</h2>
            <div ref={lineRef} className={styles.line}></div>
        </div>
  );
}
