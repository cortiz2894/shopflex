'use client';
import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import classNames from 'classnames';
import { FiShoppingCart } from 'react-icons/fi';
import Container from '@/components/Container/index';
import ButtonPrimary from '@/components/shared/ButtonPrimary/index';
import PaymentMethods from '@/components/shared/PaymentMethods/index';
import styles from './ProductDetail.module.scss';
import CarouselImages from './CarouselImages/index';
import Accordion from '../shared/Accordion/index';
import { GiReturnArrow, GiClothes, GiHandTruck, GiBookCover } from 'react-icons/gi';
import SectionTitle from '../shared/SectionTitle';
import { Carousel } from '../shared/Carousel';
import { getDrops } from '@/services/products';
import { CartStore, useCartStore } from '@/store/cartStore';
import type { Product, ProductDetail, ProductStore } from '@/interfaces/products.interface';
import toast from 'react-hot-toast';
import Image from 'next/image';
import useDeviceType from '@/hooks/useDeviceType';

const PAYMENTS_METHODS = [
  {
    id: 1,
    name: 'Mercado Pago',
    image: 'MERCADOPAGO-LOGO.png',
  },
  {
    id: 2,
    name: 'Master Card',
    image: 'MASTERDCARD-LOGO.png',
  },
  {
    id: 3,
    name: 'Visa',
    image: 'VISA.png',
  },
  {
    id: 4,
    name: 'American Express',
    image: 'AMERICANEXPRESS.png',
  },
  {
    id: 5,
    name: 'Apple Pay',
    image: 'APPLEPAY-LOGO.png',
  },
];

interface Props {
  product: ProductDetail;
  isLite?: boolean;
}

export default function ProductDetail({ product, isLite }: Props) {
  const imageContainerRef = useRef(null);
  const accordionContainerRef = useRef<HTMLDivElement | null>(null);

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  const [colorSelected, setColorSelected] = useState<string | null>(null);
  const [sizeSelected, setSizeSelected] = useState<string | null>(null);

  const isMobile = useDeviceType();
  const addProductToStore = useCartStore((state: CartStore) => state.addToCart);

  useGSAP(() => {
    if (!imageContainerRef.current || !accordionContainerRef.current) return;

    gsap.to(imageContainerRef.current, {
      y: 0,
      opacity: 1,
      delay: 0.3,
      ease: 'hop',
    });

    const accordionElements = gsap.utils.toArray(accordionContainerRef.current.children);

    gsap.from(accordionElements, {
      opacity: 0,
      y: 50,
      delay: 0.4,
      stagger: 0.2,
      duration: 0.5,
      ease: 'hop',
    });
  });

  const getRelatedProducts = async () => {
    try {
      const data = await getDrops(product.drop.slug);
      setProducts(data[0].products);
      setLoading(false);
    } catch {
      console.log('err');
    }
  };

  useEffect(() => {
    getRelatedProducts();
  }, []);

  const addProductToCart = () => {
    gsap.to('#navBar', {
      yPercent: 0,
      opacity: 1,
    });

    if (!sizeSelected || !colorSelected) {
      toast.error(
        <span>
          <ul>
            {!sizeSelected && (
              <li>
                You need to pick a <b>size</b>
              </li>
            )}
            {!colorSelected && (
              <li>
                You need to pick a <b>color</b>
              </li>
            )}
          </ul>
        </span>,
      );
      return;
    }

    const productToAdd: ProductStore = {
      id: product.id,
      title: product.title,
      description: product.description,
      price: product.price,
      image: product.thumbnail,
      slug: 'product.slug',
      discount: 0,
      size: sizeSelected,
      color: colorSelected,
      quantity: 1,
    };

    toast.success(`${product.title} Successfully added`, {
      position: 'top-right',
      icon: '🔥',
    });
    addProductToStore(productToAdd as ProductStore);
  };

  return (
    <Container mobileFullWidth={true}>
      <div
        className={classNames(
          'flex md:flex-row flex-col gap-5 ',
          { 'md:pt-[64px] md:mt-6 ': !isLite },
          { 'max-h-fit h-full': isLite },
        )}
      >
        <div className={styles.detailsContainer} ref={accordionContainerRef}>
          <Accordion
            title={'Description'}
            content={<p>{product.description}</p>}
            icon={<GiBookCover className="text-[20px] text-standar-darker" />}
          />
          <Accordion
            title={'Shipment'}
            content={
              <p>
                product.description product.description product.description product.description product.description
                product.description
              </p>
            }
            icon={<GiHandTruck className="text-[20px] text-standar-darker" />}
          />
          <Accordion
            title={"What's my size?"}
            content={<Image width={500} height={500} objectFit="none" alt="size" src="/images/sizes.webp" />}
            icon={<GiClothes className="text-[20px] text-standar-darker" />}
          />
          <Accordion
            title={'Return Policy'}
            content={
              <p>
                product.description product.description product.description product.description product.description
                product.description
              </p>
            }
            icon={<GiReturnArrow className="text-[20px] text-standar-darker" />}
          />
        </div>
        <div
          className={classNames(
            'md:w-1/2 w-full relative md:min-h-[85vh] min-h-[100vh] flex flex-col gap-4',
            [styles.imageContainer],
            [styles.containerAnimated],
            { 'max-h-full min-h-full': isLite },
          )}
          ref={imageContainerRef}
        >
          <CarouselImages images={product.images} isLite={isLite} />
        </div>
        <div className={styles.infoContainer}>
          <div>
            <span className="md:text-standar-darker text-white text-base">{product.drop.title}</span>
            <h2 className={classNames('md:text-black text-white uppercase md:mt-3 mt-2', [styles.title])}>
              {product.title}
            </h2>
            <p className={classNames('md:text-black text-white mt-2', [styles.price])}>
              $ <b>{product.price}</b>
            </p>
          </div>
          <div>
            <h3 className="text-black mb-3 md:block hidden">Sizes</h3>
            <div className="flex gap-3 mb-3">
              {product.sizes.map((size: any, i: number) => (
                <button
                  key={`size-selector-${i}`}
                  onClick={() => setSizeSelected(size)}
                  className={classNames([styles.sizeSelector], { [styles.active]: size === sizeSelected })}
                >
                  <p className="text-standar-darker">{size}</p>
                </button>
              ))}
            </div>
            <h3 className="text-black mb-3 md:block hidden">Colors</h3>
            <div className="flex gap-3 w-full h-10">
              {product.colors.map((color: any, i: number) => (
                <button
                  key={`color-selector-${i}`}
                  onClick={() => setColorSelected(color)}
                  className={classNames(styles.colorSelector, { [styles.active]: colorSelected === color }, [
                    styles[color],
                  ])}
                >
                  <div></div>
                </button>
              ))}
            </div>
          </div>
          <div className="flex flex-col gap-3">
            <ButtonPrimary
              theme={isMobile ? 'light' : 'dark'}
              action={() => addProductToCart()}
              size="full"
              variant="lessRounded"
              text={
                <span className={'flex justify-between'}>
                  Add to cart
                  <FiShoppingCart className="text-[20px] ml-2" />
                </span>
              }
            />
            <div className="mt-3 md:block hidden">
              <div className={classNames('mb-3', [styles.paymentText])}>
                <p className="text-standar-lighter text-sm text-center bg-white relative px-2">Our payment methods</p>
              </div>
              <PaymentMethods methods={PAYMENTS_METHODS} />
            </div>
          </div>
        </div>
      </div>
      {!loading && !isLite && (
        <div className="pt-10">
          <SectionTitle text="Related products" size="small" />
          <Carousel products={products} />
        </div>
      )}
    </Container>
  );
}
