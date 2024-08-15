'use client'

import Image from 'next/image';
import Container from '../Container/index';
import InfiniteText from '../Hero/InfiniteText/index';
import SectionTitle from '../shared/SectionTitle/index';
import styles from './Gallery.module.scss'

import gsap from 'gsap'
import { useEffect, useRef, useState } from 'react';

type CollectionType = {
	id: number,
	img: string,
	name: string,
	trigger: string
}

const COLLECTIONS_MOCK = [
	{
		id: 1,
		img: 'gallery-4.png',
		name: 'Fury',
		trigger: 'Click to open the collection'
	},
	{
		id: 2,
		img: 'gallery-2.jpeg',
		name: 'Fury',
		trigger: 'Click to open the collection'
	},
	{
		id: 3,
		img: 'gallery-3.png',
		name: 'Fury',
		trigger: 'Click to open the collection'
	}
]

export default function Gallery() {
	const [collections, setCollections] = useState<CollectionType[]>(COLLECTIONS_MOCK)

	const collectionsRefs = useRef<(HTMLDivElement | null)[]>([]);

	  
  useEffect(() => {
		const createScrollAnimation = (
      element: HTMLDivElement | null,
      start: string,
      end: string,
      fromTop: string,
      toTop: string
    ) => {
      if (element) {
        gsap.to(element, {
          top: toTop,
          scrollTrigger: {
            trigger: element,
            start: start,
            end: end,
            scrub: 1,
          },
          ease: 'none',
        });
      }
    };

    gsap.to(
      collectionsRefs.current,
      { 
        opacity: 1,
        y: 0,
        stagger: {
          each: 0.2,
          from: "center"
        }, 
        scrollTrigger: {
          trigger: collectionsRefs.current,
        },
				duration: 1.5,
        ease: 'ease' 
      }
    );

		createScrollAnimation(collectionsRefs.current[0], 'top center', 'bottom center', '10vh', '-10vh');
    createScrollAnimation(collectionsRefs.current[1], 'top center', 'bottom center', '-14vh', '14vh');
    createScrollAnimation(collectionsRefs.current[2], 'top center', 'bottom center', '12vh', '-12vh');

  }, []);

  return (
    <div className='w-full'>
        <Container>
            <SectionTitle position='center' text='Collections'/>
        </Container>
				<div className='flex gap-3 relative h-[80vh] mt-[13vh] mb-[25vh]'>
					{collections.map((collection, index) => {
						return(
							<div 
								className={styles.imageContainer} 
								key={`gallery-item-${collection.id}`}
								ref={(el) => (collectionsRefs.current[index] = el)}
							>
								<InfiniteText size='small' text={collection.trigger} position='bottom'/>
								<figcaption>
									<Image 
										src={`/images/${collection.img}`}
										layout='fill'
										objectFit='cover'
										alt={collection.name}
										className={styles.imageCenter}
									/>	
								</figcaption>
								<div className={styles.overlayBackground}></div>
								<Image 
									src={`/images/${collection.img}`}
									layout='fill'
									objectFit='cover'
									alt={collection.name}
								/>
							</div>
						)
					})}
				</div>
    </div>
  );
}
