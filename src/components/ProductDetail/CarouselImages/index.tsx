'use client'
import React, { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import styles from './CarouselImages.module.scss'
import classNames from 'classnames'
import ButtonPrimary from '../../shared/ButtonPrimary/index'
import { FiHeart} from "react-icons/fi";
import { useGSAP } from '@gsap/react';
import gsap from 'gsap'

import { getRemValue } from '@/utils/fontValues'

interface Props {
	images: string[]
}

export default function CarouselImages({images}: Props) {
	const [selectedImage, setSelectedImage] = useState('Reign-Of-Blood-Hoodie-2.webp')
	const refSelectedImageContainer = useRef<HTMLDivElement | null>(null)
  const refImageSelected = useRef<(HTMLImageElement | null)[]>([]);

	useGSAP(() => {

	})

	const handleSelectImage = (index:number) => {
		if(!refSelectedImageContainer.current || !refImageSelected.current) return

		const widthImageContainer = (refSelectedImageContainer.current.clientWidth * 85) / 100
		const gap = getRemValue(refSelectedImageContainer.current) * 0.75

		gsap.to(refSelectedImageContainer.current, {
			x: -((widthImageContainer) * index + (gap * index)),
			ease: 'Power4.inOut'
		})
		gsap.to(refImageSelected.current, {
			opacity: 0.8
		})
		gsap.to(refImageSelected.current[index], {
			opacity: 1
		})
	}

  return (
    <>
			<div className={styles.image}>
					<div className='absolute top-2 right-2 z-10'>
						<ButtonPrimary 
								theme='light' 
								size='small' 
								variant='lessRounded'
								text={<FiHeart className='text-[20px]'/>} 
								/>
					</div>
					<div 
						className={classNames('relative flex gap-3 h-full', [styles.selectedImageContainer])}
						ref={refSelectedImageContainer}
					>
						<>
							{images.map( (image, i) => 
								<Image 
									src={`/images/${image}`}
									layout='fill'
									objectFit='cover'
									alt={'Reign-Of-Blood'}
									className={styles.imageSelected}
									ref={(el:any) => {refImageSelected.current[i] = el}}
									key={i}
								/>
							)}
						</>
					</div>
			</div>
			<div className={styles.carouselImages}>
					{images.map((image, index) => 
					<div onClick={() => handleSelectImage(index)} key={index}>
							<Image 
									src={`/images/${image}`}
									layout='fill'
									objectFit='cover'
									alt={'Reign-Of-Blood'}
									className={styles.imageCenter}
									/>
					</div>)}
			</div>
    </>
  )
}