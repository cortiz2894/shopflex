'use client'
import Logo from '@/icons/Logo'
import React, { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import styles from './ProductDetail.module.scss'
import classNames from 'classnames'
import Container from '../Container/index'
import ButtonPrimary from '../shared/ButtonPrimary/index'
import {FiShoppingCart, FiHeart} from "react-icons/fi";
import { useGSAP } from '@gsap/react';
import gsap from 'gsap'

export default function ProductDetail() {
	const imageContainerRef = useRef(null)

	useGSAP(() => {
		if(!imageContainerRef.current) return

		gsap.to(imageContainerRef.current, {
			y: 0,
			opacity: 1,
			delay: 0.3,
			// delay: 500
		})
	})

  return (
		<Container>
			<div className='flex gap-10 pt-[64px] mt-6'>
				<div className={styles.detailsContainer}>
						<p className='text-black'>
						Emerging from the abyss, the „Reign of Blood“ Oversized Hoodie is a masterpiece. It's bold, menacing red death metal lettering sprawls across your shoulders like the blood of your enemies, a proclamation of your unwavering commitment to win every battle. Adorning the sleeves, the quote: „I call your name upon the furious winds.
		Possessed by the spiritual strength of ancient times. In the chamber of my dark heart, a black flame burns.“ These words, like an incantation, beckon the forces of the underworld to rise. Crafted with precision, this heavy oversized hoodie boasts superior quality, combining 65% cotton and 35% polyester, with a brushed fleece interior for unparalleled comfort.
					</p>
				</div>
				<div ref={imageContainerRef} 
					className={classNames('w-1/2 relative min-h-[85vh] flex flex-col gap-4', [styles.imageContainer])}
				>
					<div className={styles.image}>
						<div className='absolute top-2 right-2 z-10'>
							<ButtonPrimary 
								theme='light' 
								size='small' 
								variant='lessRounded'
								text={<FiHeart className='text-[20px]'/>} 
							/>
						</div>
						<Image 
							src='/images/Reign-Of-Blood-Hoodie-2.webp'
							layout='fill'
							objectFit='cover'
							alt={'Reign-Of-Blood'}
							className={styles.imageCenter}
						/>	
					</div>
					<div className={styles.carouselImages}>
						<div>
							<Image 
								src='/images/Reign-Of-Blood-Hoodie-2.webp'
								layout='fill'
								objectFit='cover'
								alt={'Reign-Of-Blood'}
								className={styles.imageCenter}
							/>
						</div>
						<div>
							<Image 
								src='/images/Reign-Of-Blood-Hoodie-2.webp'
								layout='fill'
								objectFit='cover'
								alt={'Reign-Of-Blood'}
								className={styles.imageCenter}
							/>
						</div>
						<div>
							<Image 
								src='/images/Reign-Of-Blood-Hoodie-2.webp'
								layout='fill'
								objectFit='cover'
								alt={'Reign-Of-Blood'}
								className={styles.imageCenter}
							/>
						</div>
						<div>
							<Image 
								src='/images/Reign-Of-Blood-Hoodie-2.webp'
								layout='fill'
								objectFit='cover'
								alt={'Reign-Of-Blood'}
								className={styles.imageCenter}
							/>
						</div>
					</div>
				</div>
				<div className={styles.infoContainer}>
					<div>
						<h2 className={classNames('text-black', [styles.title])}>REIGN OF BLOOD - HEAVY OVERSIZED HOODIE 400GSM</h2>
						<p className={classNames('text-black mt-4', [styles.price])}>U$D <b>99</b></p>
					</div>
					<div>
						<h3 className='text-black'>Sizes</h3>
						<h3 className='text-black'>Colors</h3>
						<h3 className='text-black'>Quantity</h3>
					</div>
					<ButtonPrimary
						theme='dark' 
						size='large' 
						variant='lessRounded'
						text={<span className={'flex justify-between'}>Comprar<FiShoppingCart className='text-[20px] ml-2'/></span>}
					/>
				</div>
			</div>
		</Container>
  )
}