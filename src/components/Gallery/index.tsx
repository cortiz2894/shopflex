'use client';

import Image from 'next/image';
import Container from '../Container/index';
import InfiniteText from '../Hero/InfiniteText/index';
import SectionTitle from '../shared/SectionTitle/index';
import styles from './Gallery.module.scss';

import gsap from 'gsap';
import Draggable from 'gsap/Draggable';
import { useEffect, useRef, useState } from 'react';
import { getDrops } from '@/services/products';
import { getImage } from '@/services/products';
import { LinkTransition } from '../shared/LinkTransition/LinkTransition';
import useDeviceType from '@/hooks/useDeviceType';
import { useGSAP } from '@gsap/react';
import classNames from 'classnames';
import { IoIosArrowDroprightCircle } from 'react-icons/io';

export type CollectionType = {
  id: number;
  image: string;
  title: string;
  slug: string;
};

gsap.registerPlugin(Draggable);

export default function Gallery() {
  const [collections, setCollections] = useState<CollectionType[]>([]);

  const collectionsRefs = useRef<(HTMLDivElement | null)[]>([]);
  const collectionMobileRef = useRef<HTMLDivElement | null>(null);
  const collectionMobileItemRefs = useRef<(HTMLDivElement | null)[]>([]);

  const isMobile = useDeviceType();

  const getGalleryItems = async () => {
    try {
      const res = await getDrops();
      setCollections(res);
    } catch {}
  };

  useEffect(() => {
    getGalleryItems();
  }, []);

  useGSAP(() => {
    animate();
  }, [collections, collectionMobileItemRefs]);

  const animate = () => {
    if (isMobile) {
      if (!collectionMobileRef.current || !collectionMobileItemRefs.current[0]) return;

      gsap.to(collectionMobileRef.current, {
        x: `-160vw`,
        scrollTrigger: {
          trigger: collectionMobileRef.current,
          start: 'top 50%',
          end: 'top 0%',
          scrub: 1,
          // markers: true,
        },
        ease: 'none',
      });
      console.log('collectionMobileItemRefs: ', collectionMobileItemRefs.current[0]);
      gsap.context(() => {
        Draggable.create(collectionMobileRef.current, {
          type: 'x',
          bounds: {
            minX: -(collectionMobileItemRefs.current[0] as HTMLDivElement).clientWidth * (collections.length - 1),
            maxX: 0,
          },
        });
      });
    } else {
      const createScrollAnimation = (
        element: HTMLDivElement | null,
        start: string,
        end: string,
        fromTop: string,
        toTop: string,
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

      gsap.to(collectionsRefs.current, {
        opacity: 1,
        y: 0,
        stagger: {
          each: 0.2,
          from: 'center',
        },
        scrollTrigger: {
          trigger: collectionsRefs.current,
          start: 'top bottom',
          end: 'top 60%',
          scrub: 1,
          // markers: true
        },
        duration: 1.5,
        ease: 'ease',
      });

      collectionsRefs.current.forEach((element, index) => {
        let toTop = '10vh';
        let fromTop = '-10vh';

        if (index % 2 !== 0) {
          toTop = '-14vh';
          fromTop = '14vh';
        }

        createScrollAnimation(element, 'top center', 'bottom center', toTop, fromTop);
      });
    }
  };

  return (
    <div className="w-full">
      <Container>
        <SectionTitle position="center" text="Collections" />
      </Container>
      {!isMobile && (
        <div className="flex gap-3 relative h-[80vh] mt-[13vh] mb-[25vh] mx-auto w-[98.5%]">
          {collections.map((collection, index) => {
            return (
              <div
                className={styles.imageContainer}
                key={`gallery-item-${collection.id}`}
                ref={(el) => {
                  collectionsRefs.current[index] = el;
                }}
              >
                <InfiniteText size="small" text={collection.title} position="bottom" />
                <LinkTransition href={`/product-list?collection=${collection.slug}`}>
                  <figcaption>
                    <Image
                      src={getImage(collection.image)}
                      layout="fill"
                      objectFit="cover"
                      alt={collection.title}
                      className={styles.imageCenter}
                      data-cursor="Click to open"
                      data-size="medium"
                    />
                  </figcaption>
                  <div className={styles.overlayBackground}></div>
                  <Image src={getImage(collection.image)} layout="fill" objectFit="cover" alt={collection.title} />
                </LinkTransition>
              </div>
            );
          })}
        </div>
      )}
      {isMobile && (
        <div className={classNames('flex gap-5', [styles.mobileDraggable])} ref={collectionMobileRef}>
          {collections.map((collection, index) => {
            return (
              <div
                className={styles.collectionMobile}
                id={`gallery-item-mobile-${index}`}
                key={index}
                ref={(el) => {
                  collectionMobileItemRefs.current[index] = el;
                }}
              >
                <LinkTransition href={`/product-list?collection=${collection.slug}`}>
                  <div className={styles.containerImageMobile}>
                    <Image
                      src={getImage(collection.image)}
                      alt={collection.title}
                      className={styles.mobileImage}
                      width={300}
                      height={500}
                      style={{
                        objectFit: 'cover',
                        minHeight: '100%',
                      }}
                    />
                    <div
                      className={classNames(
                        'absolute bottom-0 left-0 z-10 flex h-full justify-between w-full p-4 items-end',
                        styles.overlayGalleryMobile,
                      )}
                    >
                      <p className="text-white text-lg ">{collection.title}</p>
                      <IoIosArrowDroprightCircle className="text-white text-2xl" />
                    </div>
                  </div>
                </LinkTransition>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
