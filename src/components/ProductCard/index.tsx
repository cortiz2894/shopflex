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
import { CartStore, useCartStore } from '@/store/cartStore';

type Props = {
  item: Product,
  variant?: 'default'
}

gsap.registerPlugin(CustomEase, MotionPathPlugin);

const ButtonRender = ({isLoading}:{isLoading:boolean}) => {

  return(
    isLoading ? (
      <div>
        <span className={styles.addText}>Agregando...</span>
        <div className={styles.progress}></div>
      </div>
    ) : (
      <span className={styles.buyText}>Comprar<FiShoppingCart className='text-[20px] ml-2'/></span>
    )
  )
}

const ProductCard = forwardRef<HTMLDivElement, Props>(({item, variant = 'default'}, ref) => {

  const pathRef = useRef<SVGPathElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const [initialPath, setInitialPath] = useState('');
  const [targetPath, setTargetPath] = useState('');
  const [isLoading, setIsLoading] = useState(false)

  const addProductToStore = useCartStore((state:CartStore) => state.addToCart)


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
    if (imgRef.current && !isLoading) {
        setIsLoading(true)
        const rect = imgRef.current.getBoundingClientRect();
        const clonedImg = imgRef.current.cloneNode() as HTMLElement;
        //@ts-ignore
        const rectCartButton = document.getElementById('cartButton').getBoundingClientRect()
        Object.assign(clonedImg.style, {
          position: 'fixed',
          top: `${rect.top}px`,
          left: `${rect.left}px`,
          width: `${rect.width}px`,
          height: `${rect.height}px`,
          zIndex: '1000',
          opacity: 1
        });

        gsap.timeline()
        .to(imgRef.current, 0.2, { y: '-12', ease: 'Power1.easeNone' })
        .to(imgRef.current, 0.1, { y: '0', ease: 'Power1.easeOut',
          onComplete: () => {
            document.body.appendChild(clonedImg);
          }
         })
        .to(clonedImg, {
          top:rectCartButton.y - ((rect.height * 0.85) / 2),
          opacity: 0.2,
          left: rectCartButton.x - ((rect.height * 0.85) / 2),
          scale: 0.1,
          duration: 0.7,
          ease: "M0,0 C0.76,0 0.24,1 1,1",
          onComplete: () => {
            document.body.removeChild(clonedImg);
            addProductToStore(item)
            setIsLoading(false)
          }
        })
      }
    }

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
          
          <ButtonPrimary 
            theme='light' 
            size='small' 
            variant='lessRounded'
            text={<FiHeart className='text-[20px]'/>} 
          />
          <ButtonPrimary 
            action={addToCart} 
            theme='light' 
            variant='lessRounded' 
            size='full'
            text={<ButtonRender isLoading={isLoading} />} 
          />
        </div>
      </div>
    </div>
  );
});

export default ProductCard