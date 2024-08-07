'use client'
import React, { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';

interface Props {
    number:number
}

const Counter = ({ number }:Props) => {
  const [currentNumber, setCurrentNumber] = useState(number);
  const numberRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (number !== currentNumber) {
      const tl = gsap.timeline({
        onComplete: () => {
          setCurrentNumber(number);
        }
      });

      tl.to(numberRef.current, {
        y: -10,
        opacity: 0,
        duration: 0.2,
        onComplete: () => {
          gsap.set(numberRef.current, { y: 10, opacity: 0 });
          gsap.to(numberRef.current, { y: 0, opacity: 1, duration: 0.2 });
        }
      });
    }
  }, [number, currentNumber]);

  return (
    <div className="counter">
      <div ref={numberRef}>
        <span className="text-white text-xs">{currentNumber}</span>
      </div>
    </div>
  );
};

export default Counter;
