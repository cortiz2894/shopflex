'use client'
import React, { useRef, useEffect, useLayoutEffect } from "react";
import { gsap } from "gsap";
import Draggable from "gsap/Draggable";
import styles from './Carousel.module.scss'
// import InertiaPlugin from 'gsap-trial/InertiaPlugin';
import ProductCard from "@/components/ProductCard/index";

gsap.registerPlugin(Draggable);

const PRODUCT_LIST = [
  {
    id: 1,
    title: 'Reign Of Blood 2.0 - Boardshorts',
    price: 99,
    description: `Our "Reign Of Blood Shorts" in black & white are the perfect addition to our already legendary perfect`,
    image: 't-shirt-1.png'
  },
  {
    id: 2,
    title: 'Reign Of Blood 2.0 - Boardshorts',
    price: 99,
    description: `Our "Reign Of Blood Shorts" in black & white are the perfect addition to our already legendary perfect`,
    image: 'hoodie.png'
  },
  {
    id: 3,
    title: 'Reign Of Blood 2.0 - Boardshorts',
    price: 99,
    description: `Our "Reign Of Blood Shorts" in black & white are the perfect addition to our already legendary perfect`,
    image: 'gorra.png'
  },
  {
    id: 5,
    title: 'Reign Of Blood 2.0 - Boardshorts',
    price: 99,
    description: `Our "Reign Of Blood Shorts" in black & white are the perfect addition to our already legendary perfect`,
    image: 'shorts.png'
  },
	{
    id: 1,
    title: 'Reign Of Blood 2.0 - Boardshorts',
    price: 99,
    description: `Our "Reign Of Blood Shorts" in black & white are the perfect addition to our already legendary perfect`,
    image: 't-shirt-1.png'
  },
  {
    id: 2,
    title: 'Reign Of Blood 2.0 - Boardshorts',
    price: 99,
    description: `Our "Reign Of Blood Shorts" in black & white are the perfect addition to our already legendary perfect`,
    image: 'hoodie.png'
  },
  {
    id: 3,
    title: 'Reign Of Blood 2.0 - Boardshorts',
    price: 99,
    description: `Our "Reign Of Blood Shorts" in black & white are the perfect addition to our already legendary perfect`,
    image: 'gorra.png'
  },
  {
    id: 5,
    title: 'Reign Of Blood 2.0 - Boardshorts',
    price: 99,
    description: `Our "Reign Of Blood Shorts" in black & white are the perfect addition to our already legendary perfect`,
    image: 'shorts.png'
  }
];

export const Carousel = () => {
  const sliderRef = useRef(null);
  const productRefs = useRef<(HTMLDivElement | null)[]>([]);

  useLayoutEffect(() => {
		gsap.to(
      productRefs.current,
      { 
        opacity: 1,
        y: 0,
        stagger: {
          each: 0.1,
          // from: "center"
        }, 
        scrollTrigger: {
          trigger: productRefs.current,
          // toggleActions: 'restart none none none'
        }, 
        ease: 'ease' 
      }
    );
    const ctx = gsap.context(() => {
      Draggable.create(sliderRef.current, {
        type: 'x',
        bounds: {
          minX: -sliderRef.current.clientWidth + window.innerWidth * 0.88,
          maxX: 0,
        },
        // inertia: true,
      });
    });
    return () => ctx.revert();
  }, []);

  return (
		// <div className="relative w-full h-[37vh]">
			<div id="slider" className={styles.slider} ref={sliderRef}>
				{PRODUCT_LIST.map((item, index) => {
					return (
						<ProductCard
							ref={(el) => {productRefs.current[index] = el}}
							key={`item-${item.id}`}
							item={item}
						/>
					);
				})}
			</div>
		// </div> 
  );
};
