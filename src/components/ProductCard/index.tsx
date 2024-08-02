'use client'
import { useEffect, useRef, useState } from 'react';
import styles from './ProductCard.module.scss'
import classNames from "classnames";
import Image from "next/image";
import gsap from 'gsap';
import { CustomEase } from 'gsap/CustomEase';
import ButtonPrimary from '../ButtonPrimary/ButtonPrimary';
import {FiShoppingCart} from "react-icons/fi";
import { FiHeart } from "react-icons/fi";


type Props = {
}

gsap.registerPlugin(CustomEase);

export default function ProductCard({}:Props) {
  const pathRef = useRef<SVGPathElement>(null);
  const card = useRef<HTMLDivElement>(null);
  const [initialPath, setInitialPath] = useState('');
  const [targetPath, setTargetPath] = useState('');


    useEffect(() => {
      if (card.current) {
        const width = card.current.clientWidth;
        setInitialPath(`M50 0 L100 0 L100 ${width} L100 ${width} Q100 ${width / 2} 0 0`);
        setTargetPath(`M100 0 L200 0 L200 ${width} L100 ${width} Q-0 ${width / 2} 100 0`);
      }
    }, [card.current]);
  
  const animatePath = (path:string) => {
    gsap.to(pathRef.current, {
      attr: { d: path },
      duration: 0.5,
      ease: 'customEase'
    });
  };

  CustomEase.create("customEase", "M0,0 C0.76,0 0.24,1 1,1");

  return (
    <div 
      className={classNames(`w-1/4 relative`, [styles.card])} 
      
      ref={card}
      onMouseEnter={() => animatePath(targetPath)}
      onMouseLeave={() => animatePath(initialPath)}
    >
      <div 
        className='relative h-[60%] flex justify-center'
        style={{height: `${card?.current?.clientWidth}px`}}
      >
        <div className={styles.imageContainer}>
          <Image 
            src={`/images/shorts.png`}
            width={500} height={500} objectFit="none"
            alt='clothes'
          />
        </div>
      </div>
      <div className={classNames('bottom-0 px-6 py-6', [styles.content])}>
        <svg className={styles.svgCurve} style={{height: `${card?.current?.clientWidth}px`}}>
          <path ref={pathRef} d={initialPath}></path>
        </svg>
        <div className='flex justify-between'>
          <p className='text-2xl text-black max-w-[70%] text-ellipsis whitespace-nowrap overflow-hidden'>Baseball cap</p>
          <span className='text-xl uppercase text-black font-semibold'>$ 44.9</span>
        </div>
        <span className={classNames('text-black my-3 block', [styles.description])}>Es posible que el SVG no el card tenga una referencia válida. Vamos a asegurarnos inicializar </span>
        <div className='flex justify-between items-center'>
          
          <ButtonPrimary text={<FiHeart className='text-[20px]'/>} variant='outlined' size='small'></ButtonPrimary>
          <ButtonPrimary text={<span className='flex'>Comprar<FiShoppingCart className='text-[20px] ml-2'/></span>} variant='outlined'></ButtonPrimary>

        </div>
      </div>
    </div>
  );
}
