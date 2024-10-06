'use client';
import React, { useEffect, useRef, useState } from 'react';
import ProductCard from "@/components/ProductCard/index";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { ListProductProps } from '@/components/shared/Carousel/index';

gsap.registerPlugin(ScrollTrigger);

export default function ProductList({products}:ListProductProps) {
  const productRefs = useRef<(HTMLDivElement | null)[]>([]);
  
  useEffect(() => {
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
  }, []);

  return (
    <div className="grid md:grid-cols-4 grid-cols-1 md:gap-x-5 overflow-y-hidden pt-[7%] mt-[-6%] gap-y-2 md:gap-y-[5em]">
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
  );
}
