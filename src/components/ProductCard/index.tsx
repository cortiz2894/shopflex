'use client'
import { useEffect, useRef, useState, forwardRef } from 'react';
import styles from './ProductCard.module.scss'
import classNames from "classnames";
import Image from "next/image";
import gsap from 'gsap';
import { CustomEase } from 'gsap/CustomEase';
import ButtonPrimary from '../ButtonPrimary/ButtonPrimary';
import {FiShoppingCart} from "react-icons/fi";
import { FiHeart } from "react-icons/fi";
import { Product } from './product.types';

type Props = {
  item: Product,
  variant?: 'default'
}

gsap.registerPlugin(CustomEase);

const ProductCard = forwardRef<HTMLDivElement, Props>(({item, variant = 'default'}, ref) => {

  const pathRef = useRef<SVGPathElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const [initialPath, setInitialPath] = useState('');
  const [targetPath, setTargetPath] = useState('');

  const getWidthCard = () => {
    if (cardRef.current) {
      const width = cardRef.current.clientWidth;
      setInitialPath(`M0 100 L0 200 L${width} 200 L${width} 100 Q${width / 2} 100 0 100`);
      setTargetPath(`M0 100 L0 200 L${width} 200 L${width} 100 Q${width / 2} 0 0 100`);
    }
  }
  
  useEffect(() => {
    getWidthCard()
    window.addEventListener('resize', getWidthCard)
    return () => {
      window.removeEventListener('resize', getWidthCard)
    };
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
      className={classNames(`w-full relative`, [styles.card])} 
      ref={ref}
      onMouseEnter={() => animatePath(targetPath)}
      onMouseLeave={() => animatePath(initialPath)}
    >
      <div 
        ref={cardRef}
        className='relative w-full pb-[100%] flex justify-center'
      >
        <div className={styles.imageContainer}>
          <Image 
            src={`/images/${item.image}`}
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
          <p className='text-2xl text-black max-w-[70%] text-ellipsis whitespace-nowrap overflow-hidden'>{item.title}</p>
          <span className='text-xl uppercase text-black font-semibold'>$ {item.price}</span>
        </div>
        <span className={classNames('text-black my-3 block', [styles.description])}>{item.description}</span>
        <div className='flex justify-between items-center gap-4'>
          
          <ButtonPrimary theme='light' text={<FiHeart className='text-[20px]'/>} size='small' variant='lessRounded'></ButtonPrimary>
          <ButtonPrimary theme='light' text={<span className='flex'>Comprar<FiShoppingCart className='text-[20px] ml-2'/></span>} variant='lessRounded' size='full'></ButtonPrimary>

        </div>
      </div>
    </div>
  );
});

export default ProductCard