'use client'

import { useEffect, useState } from "react";

import { useQuickAddStore } from "@/store/quickAddStore";
import { Vaul } from "@/components/shared/Vaul";
import ProductDetail from "@/components/ProductDetail/index";

import type { ProductDetail as ProductDetailProps } from '@/components/ProductCard/product.types';
import { getProduct } from '@/services/products';

const ContentVaul = ({slug}: {slug: string}) => {
  const [product, setProduct]  = useState<ProductDetailProps | null>(null)

  useEffect(() => {
    getProductData()
  }, [slug])

  const getProductData = async ()  => {
    try {
      const data = await getProduct(slug)
      setProduct(data as unknown as ProductDetailProps)
    }
    catch {

    }
  }

  if(product) return <ProductDetail product={product} isLite={true}/>

  return<div>Loading product</div>
}

export const ProductVaul = () => {

  const { slug } = useQuickAddStore();

  return(
    <Vaul 
      content={<ContentVaul slug={slug}/>} 
      show={slug}
    />
  )
}