'use client'

import Image from 'next/image';
import styles from './ProductsHero.module.scss'

import gsap from 'gsap'
import { useEffect, useRef, useState } from 'react';
import { LinkTransition } from '../shared/LinkTransition/LinkTransition';
import type { CollectionType } from '../Gallery';
import Container from '../Container';

type ProductsHeroProps = Pick<CollectionType, 'image' | 'title'> ;

export default function ProductsHero({image, title} :ProductsHeroProps) {

	useEffect(() => {
  }, []);

  return (
    <div className='flex gap-3 relative h-[35vh] mb-5 w-full'>
      <Image 
        src={image}
        layout='fill'
        objectFit='cover'
        alt={title}
        className={styles.image}
      />
      <div className={styles.overlay}></div>
      <Container> 
        <div className='h-full flex flex-col items-start justify-end w-full z-10'>
          <h3 className={styles.title}>{title}</h3>
          <ul className={styles.breadcrumb}>
            <li className='hover:underline'><LinkTransition href="/">Home</LinkTransition></li>
            <li className='hover:underline'><LinkTransition href="/product-list">Products</LinkTransition></li>
            <li>{title}</li>
          </ul>
        </div>
      </Container>
    </div>
  );
}
