'use client'
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useLayoutEffect, useRef, useState } from "react";
import classNames from "classnames";
import styles from './Title.module.scss'

interface Props {
    text: string
}

gsap.registerPlugin(ScrollTrigger);


export default function Title({text}:Props) {
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
        <div className="relative flex items-center mt-[2rem] mb-[5rem]">
            <h2 className={classNames("text-standar-darker", [styles.title])}>{text}</h2>
            <div ref={lineRef} className={styles.line}></div>
        </div>
  );
}
