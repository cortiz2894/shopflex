'use client'

import Image from 'next/image';
import Container from '../Container/index';
import InfiniteText from '../Hero/InfiniteText/index';
import SectionTitle from '../shared/SectionTitle/index';
import styles from './Gallery.module.scss'

import gsap from 'gsap'
import { useEffect, useRef, useState } from 'react';
import { getDrops } from '@/services/products';
import { getImage } from '@/services/products'
import { LinkTransition } from '../shared/LinkTransition/LinkTransition';

export type CollectionType = {
	id: number,
	image: string,
	title: string,
	slug: string
}

export default function Gallery() {
	const [collections, setCollections] = useState<CollectionType[]>([])

	const collectionsRefs = useRef<(HTMLDivElement | null)[]>([]);

	const getGalleryItems = async () => {
		try {
			const res = await getDrops()
			setCollections(res)
		}
		catch {}
	}

	useEffect(() => {
		getGalleryItems()
  }, []);
	
  useEffect(() => {
		animate()
  }, [collections]);

	const animate = () => {
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
						scrub: true,
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
					start: 'top bottom',
					end: 'top 60%',
					scrub: 1,
					// markers: true
        },
				duration: 1.5,
        ease: 'ease' 
      }
    );

		collectionsRefs.current.forEach((element, index) => {
			let toTop = '10vh'
			let fromTop = '-10vh'

			if (index % 2 !== 0) {
				toTop =  '-14vh'
				fromTop = '14vh'
			}
			
			createScrollAnimation(element, 'top center', 'bottom center', toTop, fromTop);
		});
	}

  return (
    <div className='w-full' >
        <Container>
            <SectionTitle position='center' text='Collections'/>
        </Container>
				<div
				 className='flex gap-3 relative h-[80vh] mt-[13vh] mb-[25vh] mx-auto w-[98.5%]'>
					{collections.map((collection, index) => {
						return(
							<div 
								className={styles.imageContainer} 
								key={`gallery-item-${collection.id}`}
								ref={(el) => { collectionsRefs.current[index] = el }}
							>
								<InfiniteText size='small' text={collection.title} position='bottom'/>
								<LinkTransition href={`/product-list?collection=${collection.slug}`} >
									<figcaption>
										<Image 
											src={getImage(collection.image)}
											layout='fill'
											objectFit='cover'
											alt={collection.title}
											className={styles.imageCenter}
											data-cursor="Click to open"
											data-size="medium"
										/>	
									</figcaption>
									<div className={styles.overlayBackground}></div>
									<Image 
										src={getImage(collection.image)}
										layout='fill'
										objectFit='cover'
										alt={collection.title}
									/>
								</LinkTransition>
							</div>
						)
					})}
				</div>
    </div>
  );
}
