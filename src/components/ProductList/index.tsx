'use client';
import React, { useEffect, useRef, useState } from 'react';
import ProductCard from "@/components/ProductCard/index";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { Product } from "../ProductCard/product.types";

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
  }
];

gsap.registerPlugin(ScrollTrigger);

export default function ProductList() {
  const [products, setProducts] = useState<Product[]>(PRODUCT_LIST);
  const productRefs = useRef<(HTMLDivElement | null)[]>([]);
  
  useEffect(() => {
    gsap.fromTo(
      productRefs.current,
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, stagger: 0.3, scrollTrigger: productRefs.current }
    );
  }, []);

  return (
    <div className="grid grid-cols-4 gap-5">
      {products.map((item, index) => {
        return (
          <ProductCard
            ref={(el) => (productRefs.current[index] = el)}
            key={`item-${item.id}`}
            item={item}
          />
        );
      })}
    </div>
  );
}
