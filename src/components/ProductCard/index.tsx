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
        setInitialPath(`M0 100 L0 200 L${width} 200 L${width} 100 Q${width / 2} 100 0 100`);
        // setInitialPath(`M0 0 L0 0 L${width} 0 L${width} 0 Q${width / 2} 0 0 0`);
        setTargetPath(`M0 100 L0 200 L${width} 200 L${width} 100 Q${width / 2} -10 0 100`);
      }
    }, []);
  
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
        className='relative w-full pb-[100%] flex justify-center'
      >
        <div className={styles.imageContainer}>
          <Image 
            src={`/images/shorts.png`}
            width={500} height={500} objectFit="none"
            alt='clothes'
          />
        </div>
      </div>
      <div className={classNames('bottom-0 px-6 py-6 relative', [styles.content])}>
        <svg className={styles.svgCurve}>
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
