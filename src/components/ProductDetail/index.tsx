'use client'
import React, { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react';
import classNames from 'classnames';
import { FiShoppingCart, FiFileText, FiTruck } from "react-icons/fi";
import Container from '@/components/Container/index';
import ButtonPrimary from '@/components/shared/ButtonPrimary/index';
import PaymentMethods from '@/components/shared/PaymentMethods/index';
import styles from './ProductDetail.module.scss';
import CarouselImages from './CarouselImages/index';
import Accordion from '../shared/Accordion/index';
import { GiReturnArrow, GiClothes, GiHandTruck, GiBookCover } from "react-icons/gi";
import SectionTitle from '../shared/SectionTitle';
import { Carousel } from '../shared/Carousel';
import { getDrops } from '@/services/products';
import { Product } from '../ProductCard/product.types';

const PRODUCT = {
	id: 1,
	title: 'Reign Of Blood 2.0 - Boardshorts',
	price: 99,
	description: `Emerging from the abyss, the „Reign of Blood“ Oversized Hoodie is a masterpiece. It's bold, menacing red death metal lettering sprawls across your shoulders like the blood of your enemies, a proclamation of your unwavering commitment to win every battle. Adorning the sleeves, the quote: „I call your name upon the furious winds.
	Possessed by the spiritual strength of ancient times. In the chamber of my dark heart, a black flame burns.“ These words, like an incantation, beckon the forces of the underworld to rise. Crafted with precision, this heavy oversized hoodie boasts superior quality, combining 65% cotton and 35% polyester, with a brushed fleece interior for unparalleled comfort.`,
	images: ['Reign-Of-Blood5.jpg', 'Reign-Of-Blood-Hoodie-2.webp', 'Reign-Of-Blood-3.webp', 'Reign-Of-Blood-Hoodie-2-2.webp', 'MoeHoodie.webp', 'Reign-Of-Blood-Hoodie-2-2.webp', 'MoeHoodie.webp'],
	colors: ['b41213', '0f0f0f' ],
	sizes: ['small', 'large', 'extra_large'],
	stock: 15,
	collection: 'Reign Of Blood v1'
}

const PAYMENTS_METHODS = [
	{
		id:1,
		name: 'Mercado Pago',
		image: 'MERCADOPAGO-LOGO.png',
	},
	{
		id:2,
		name: 'Master Card',
		image: 'MASTERDCARD-LOGO.png',
	},
	{
		id:3,
		name: 'Visa',
		image: 'VISA.png',
	},
	{
		id:4,
		name: 'American Express',
		image: 'AMERICANEXPRESS.png',
	},
	{
		id:5,
		name: 'Apple Pay',
		image: 'APPLEPAY-LOGO.png',
	}
]

interface Drop {
	title: string,
	slug: string,
}

export interface ProductDetailTypes {
	id: number,
	title: string,
	drop: Drop,
	price: number,
	description: string,
	images: string[],
	colors: string[],
	sizes: string[],
	stock?: number,
	collection?: string
}

interface Props {
	product: ProductDetailTypes
}

export default function ProductDetail({product}: Props) {

	const imageContainerRef = useRef(null)
	const accordionContainerRef = useRef<HTMLDivElement | null>(null)
	
	const [products, setProducts] = useState<Product[]>([])
	const [loading, setLoading] = useState(true)

	const [colorSelected, setColorSelected] = useState<string | null>(null)
	const [sizeSelected, setSizeSelected] = useState<string | null>(null)

	useGSAP(() => {

		if(!imageContainerRef.current || !accordionContainerRef.current) return

		gsap.to(imageContainerRef.current, {
			y: 0,
			opacity: 1,
			delay: 0.3,
			ease: 'hop'
		})

		const accordionElements = gsap.utils.toArray(accordionContainerRef.current.children);

    gsap.from(accordionElements, {
      opacity: 0,
      y: 50,
			delay: 0.4,
      stagger: 0.2, 
      duration: 0.5,
      ease: 'hop',
    });
	})

	const getRelatedProducts = async() => {
		try {
			const data = await getDrops(product.drop.slug);
			setProducts(data[0].products)
			setLoading(false)
		}
		catch {
			console.log('err')
		}
	}

	useEffect(() => {
		getRelatedProducts()
	}, [])

  return (
		<Container>
			<div 
			className={classNames('flex gap-5 pt-[64px] mt-6')} 
			>
				<div className={styles.detailsContainer} ref={accordionContainerRef}>
						<Accordion 
							title={'Description'} 
							content={product.description} 
							icon={<GiBookCover className='text-[20px] text-standar-darker'/>}
						/>
						<Accordion 
							title={'Shipment'} 
							content={'product.description product.description product.description product.description product.description product.description'}
							icon={<GiHandTruck className='text-[20px] text-standar-darker'/>}
						/>
						<Accordion 
							title={"What's my size?"} 
							content={'product.description product.description product.description product.description product.description product.description'}
							icon={<GiClothes className='text-[20px] text-standar-darker'/>}
						/>
						<Accordion 
							title={"Return Policy"} 
							content={'product.description product.description product.description product.description product.description product.description'}
							icon={<GiReturnArrow className='text-[20px] text-standar-darker'/>}
						/>
				</div>
				<div 
					className={classNames('w-1/2 relative min-h-[85vh] flex flex-col gap-4', [styles.imageContainer] , [styles.containerAnimated])}
					ref={imageContainerRef} 
				>
					<CarouselImages images={product.images} />
				</div>
				<div className={styles.infoContainer}>
					<div>
						<span className='text-standar-darker text-base mb-3'>{product.drop.title}</span>
						<h2 className={classNames('text-black uppercase mt-3', [styles.title])}>{product.title}</h2>
						<p className={classNames('text-black mt-2', [styles.price])}>$ <b>{product.price}</b></p>
					</div>
					<div>
						<h3 className='text-black mb-3'>Sizes</h3>
						<div className='flex gap-3 mb-3' data-cursor-size="0px">
							{product.sizes.map((size, i) => 
								<button 
									key={`size-selector-${i}`}
									onClick={() => setSizeSelected(size)} 
									className={classNames([styles.sizeSelector], {[styles.active] : size === sizeSelected})}
								>
									<p className='text-standar-darker'>{size}</p>
								</button>
							)}
						</div>
						<h3 className='text-black mb-3'>Colors</h3>
						<div className='flex gap-3 w-full h-10' data-cursor-size="0px">
							{product.colors.map((color, i) => 
									<button 
										key={`color-selector-${i}`}
										onClick={() => setColorSelected(color)} 
										className={classNames(styles.colorSelector, {[styles.active] : colorSelected === color }, [styles[color]])}>
										<div></div>
									</button>	
							)}
						</div>
					</div>
					<div className='flex flex-col gap-3'>
						<ButtonPrimary
							theme='dark' 
							size='full' 
							variant='lessRounded'
							text={<span className={'flex justify-between'}>Add to cart<FiShoppingCart className='text-[20px] ml-2'/></span>}
						/>
						<div className='mt-3'>
							<div className={classNames('mb-3', [styles.paymentText])}><p className='text-standar-lighter text-sm text-center bg-white relative px-2'>Our payment methods</p></div>
							<PaymentMethods methods={PAYMENTS_METHODS}/>
						</div>
					</div>
				</div>
			</div>
			{!loading && (
				<div className='pt-10'>
					<SectionTitle text='Related products' size='small'/>
					<Carousel products={products}/>
				</div>
			)}
		</Container>  
  )
}