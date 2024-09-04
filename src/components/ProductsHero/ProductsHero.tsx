'use client'

import Image from 'next/image';
import styles from './ProductsHero.module.scss'

import gsap from 'gsap'
import { useEffect, useRef, useState } from 'react';
import { getImage } from '@/services/products'
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
        src={getImage(image)}
        layout='fill'
        objectFit='cover'
        alt={title}
        className={styles.image}
      />
      <Container> 
        <div className='h-full flex items-center justify-start w-full z-10'>
          <h3 className={styles.title}>{title}</h3>
        </div>
      </Container>
    </div>
  );
}
