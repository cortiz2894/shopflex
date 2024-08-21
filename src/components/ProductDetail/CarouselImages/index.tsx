'use client'
import React, { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import styles from './CarouselImages.module.scss'
import classNames from 'classnames'
import ButtonPrimary from '../../shared/ButtonPrimary/index'
import { FiHeart} from "react-icons/fi";
import { useGSAP } from '@gsap/react';
import gsap from 'gsap'
import { BsChevronCompactRight } from "react-icons/bs";
import Draggable from "gsap/Draggable";

import { getRemValue } from '@/utils/fontValues'

interface Props {
	images: string[]
}

gsap.registerPlugin(Draggable) 

export default function CarouselImages({images}: Props) {
	const [selected, setSelected] = useState(0)
	const refSelectedImageContainer = useRef<HTMLDivElement | null>(null)
  const refImageSelected = useRef<(HTMLDivElement | null)[]>([]);

	useGSAP(() => {
		Draggable.create(refSelectedImageContainer.current, {
			type: "x",
			bounds: {
          minX: -(refImageSelected.current[0] as HTMLDivElement).clientWidth * (images.length - 1),
          maxX: 0,
        },
			inertia: true,
			onClick: function () {
				console.log("clicked");
			},
			onDrag: function () {
				if (!refSelectedImageContainer.current) return;
	
				const widthImageContainer = (refSelectedImageContainer.current.clientWidth * 85) / 100;
				const gap = getRemValue(refSelectedImageContainer.current) * 0.75;
				const xPos = this.x;
	
				const index = Math.round(-xPos / (widthImageContainer + gap));
				gsap.to(refImageSelected.current, {
					opacity: 0.8
				})
				gsap.to(refImageSelected.current[index], {
					opacity: 1
				})
				setSelected(index);
			},
			onDragEnd: function () {
				console.log("drag ended");
			},
		});

	})

	const handleSelectImage = (index:number) => {
		if(!refSelectedImageContainer.current || !refImageSelected.current) return

		const widthImageContainer = (refSelectedImageContainer.current.clientWidth * 85) / 100
		const gap = getRemValue(refSelectedImageContainer.current) * 0.75
		setSelected(index)

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
					<div className='absolute top-2 right-2 z-[99999]'>
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
								<div 
									className={styles.imageSelected}
									ref={(el) => {refImageSelected.current[i] = el}}
								>
									<Image 
										src={`/images/${image}`}
										layout='fill'
										objectFit='cover'
										alt={'Reign-Of-Blood'}
										key={i}
									/>
								</div>
							)}
						</>
					</div>
					{selected < images.length -1 && (
							<button 
								onClick={() => handleSelectImage(selected + 1)}
								className={
									classNames('absolute right-0 h-full top-0 z-10', [styles.arrow], [styles.right])
								}
							>
								<BsChevronCompactRight className={classNames('text-[3em] text-white', [styles.svgPrime])}/>
								<span className={styles.animatedButton}><BsChevronCompactRight className={'text-[3em] text-white'}/></span>
							</button>
					)}
					{selected === images.length -1 && (
							<button 
								onClick={() => handleSelectImage(0)}
								className={
									classNames('rotate-180 absolute left-0 h-full top-0 z-10', [styles.arrow], [styles.right])
								}
							>
								<BsChevronCompactRight className={classNames('text-[3em] text-white', [styles.svgPrime])}/>
								<span className={styles.animatedButton}><BsChevronCompactRight className={'text-[3em] text-white'}/></span>
							</button>
					)}
			</div>
			<div className={styles.carouselImages}>
					{images.map((image, index) => 
					<div className={classNames(selected === index && [styles.active])} onClick={() => handleSelectImage(index)} key={index}>
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