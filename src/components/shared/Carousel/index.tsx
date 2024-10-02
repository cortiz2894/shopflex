'use client'
import React, { useRef, useEffect } from "react";
import { gsap } from "gsap";
import Draggable from "gsap/Draggable";
import styles from './Carousel.module.scss'
import ProductCard from "@/components/ProductCard/index";
import { BsChevronCompactLeft, BsChevronCompactRight } from "react-icons/bs";
import classNames from "classnames";
import type { Product } from "@/components/ProductCard/product.types";

gsap.registerPlugin(Draggable);

export interface ListProductProps {
  products: Product[]
}

export const Carousel = ({products}:ListProductProps) => {
  const sliderRef = useRef<HTMLDivElement | null>(null);
  const productRefs = useRef<(HTMLDivElement | null)[]>([]);

  const position = useRef(0);

  useEffect(() => {
		if(!sliderRef.current) return
		gsap.to(
      productRefs.current,
      { 
        opacity: 1,
        y: 0,
        stagger: {
          each: 0.1,
        }, 
        scrollTrigger: {
          trigger: productRefs.current,
        }, 
        ease: 'ease' 
      }
    );
    const ctx = gsap.context(() => {
      Draggable.create(sliderRef.current, {
        type: 'x',
        bounds: {
          minX: -(sliderRef.current as HTMLDivElement).clientWidth + window.innerWidth * 0.88,
          maxX: 0,
        },
				onDrag: function() {
          position.current = this.x;
        }
      });
    });
    return () => ctx.revert();
  }, []);

	const moveSlider = (direction: number) => {
		if(!sliderRef.current) return 
    const sliderWidth = (sliderRef.current as HTMLDivElement).clientWidth;
    const viewportWidth = window.innerWidth * 0.88;
    const maxPosition = 0;
    const minPosition = -sliderWidth + viewportWidth;
		// Calculo el valor de 1em 
		const fontSize = window.getComputedStyle(sliderRef.current).fontSize;
    const emValue = parseFloat(fontSize);

		const itemWidth = productRefs.current[0]?.clientWidth ?? 0
		// Esto es para calcular el valor del gap y que se mueva los px
    let newPosition = position.current + direction * (itemWidth + emValue * 1.25); 
    newPosition = Math.max(minPosition, Math.min(maxPosition, newPosition));

    gsap.to(sliderRef.current, { x: newPosition, duration: 0.5, ease: "power2.out" });
    position.current = newPosition;
  };



  return (
    <>
      <div
        className={classNames("relative w-full md:h-[37vw] h-[75vh] overflow-y-hidden md:overflow-y-visible", [styles.container])}>
        <div id="slider" className={styles.slider} ref={sliderRef}>
          {products.map((item, index) => {
            return (
              <ProductCard
                ref={(el) => {productRefs.current[index] = el}}
                key={`item-${item.id}`}
                item={item}
              />
            );
          })}
        </div>
        <button onClick={() => moveSlider(1)} className={classNames('absolute', [styles.arrow], [styles.left])}>
          <BsChevronCompactLeft className={classNames('text-[3em] text-[#8f8e8e]', [styles.svgPrime])}/>
          <span className={styles.animatedButton}><BsChevronCompactLeft className={'text-[3em] text-black'}/></span>
        </button>
        <button onClick={() => moveSlider(-1)} className={classNames('absolute', [styles.arrow], [styles.right])}>
          <BsChevronCompactRight className={classNames('text-[3em] text-[#8f8e8e]', [styles.svgPrime])}/>
          <span className={styles.animatedButton}><BsChevronCompactRight className={'text-[3em] text-black'}/></span>
        </button>
      </div> 
    </>
  );
};
