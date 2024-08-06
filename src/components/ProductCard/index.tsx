'use client'
import { useEffect, useRef, useState, forwardRef } from 'react';
import styles from './ProductCard.module.scss'
import classNames from "classnames";
import Image from "next/image";
import gsap from 'gsap';
import { CustomEase } from 'gsap/CustomEase';
import ButtonPrimary from '../shared/ButtonPrimary';
import {FiShoppingCart} from "react-icons/fi";
import { FiHeart } from "react-icons/fi";
import { Product } from './product.types';
import { MotionPathPlugin } from 'gsap/MotionPathPlugin';

type Props = {
  item: Product,
  variant?: 'default'
}

gsap.registerPlugin(CustomEase, MotionPathPlugin);


const ProductCard = forwardRef<HTMLDivElement, Props>(({item, variant = 'default'}, ref) => {

  const pathRef = useRef<SVGPathElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
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

  const addToCart = () => {
      

      if (imgRef.current) {
        const rect = imgRef.current.getBoundingClientRect();
        const clonedImg = imgRef.current.cloneNode() as HTMLElement;
        //@ts-ignore
        const rectCartButton = document.getElementById('cartButton').getBoundingClientRect()
        console.log('rectCartButton: ', rectCartButton)
        Object.assign(clonedImg.style, {
          position: 'fixed',
          top: `${rect.top}px`,
          left: `${rect.left}px`,
          width: `${rect.width}px`,
          height: `${rect.height}px`,
          zIndex: '1000',
          opacity: 1
        });

        document.body.appendChild(clonedImg);
        
        gsap.to(clonedImg, {
          top:rectCartButton.y - (rect.height / 2),
          opacity: 0.1,
          left: rectCartButton.x - (rect.width / 2),
          scale: 0.1,
          duration: 1,
          ease: 'power1.out',
          onComplete: () => {
            document.body.removeChild(clonedImg);
          }
        })
      }
    }

  CustomEase.create("customEase", "M0,0 C0.76,0 0.24,1 1,1");


  // useEffect(() => {
  //   return () => {
  //     if (clonedImage) {
  //       document.body.removeChild(clonedImage);
  //     }
  //   };
  // }, [clonedImage]);

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
            ref={imgRef}
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
          <ButtonPrimary action={addToCart} theme='light' text={<span className='flex'>Comprar<FiShoppingCart className='text-[20px] ml-2'/></span>} variant='lessRounded' size='full'></ButtonPrimary>

        </div>
      </div>
    </div>
  );
});

export default ProductCard