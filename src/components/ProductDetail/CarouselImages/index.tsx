'use client'
import React, { useRef, useState } from 'react'
import Image from 'next/image'
import classNames from 'classnames'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react';
import { FiHeart, FiZoomIn, FiZoomOut } from "react-icons/fi";
import { BsChevronCompactLeft, BsChevronCompactRight } from "react-icons/bs";
import Draggable from "gsap/Draggable";

import ButtonPrimary from '@/components/shared/ButtonPrimary/index'
import { getRemValue } from '@/utils/fontValues'
import styles from './CarouselImages.module.scss'
import { getImage } from '@/services/products'

interface Props {
	images: string[]
}

gsap.registerPlugin(Draggable) 

export default function CarouselImages({images}: Props) {
	const [selected, setSelected] = useState(0)
	const refSelectedImageContainer = useRef<HTMLDivElement | null>(null)
  const refImageSelected = useRef<(HTMLDivElement | null)[]>([]);

	const [isZoomActive, setIsZoomActive] = useState(false)
	const [zoomLevel, setZoomLevel] = useState(1);
	const loupeRef = useRef<(HTMLDivElement | null)[]>([]);

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

				disableZoom()

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

		disableZoom()

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

	const handleMouseMove = (e:React.MouseEvent) => {
		if(!isZoomActive) return

		if (!refImageSelected.current || !loupeRef.current) return;

		const magnifyGlassElem = loupeRef.current[selected] as HTMLDivElement
		const ImageSelectedElem = refImageSelected.current[selected] as HTMLDivElement

		const rect = ImageSelectedElem.getBoundingClientRect();
		const offsetX = e.clientX - rect.left;
		const offsetY = e.clientY - rect.top;
	
		const positionRatio = [
			Math.round(offsetX / rect.width * 1000) / 1000,
			Math.round(offsetY / rect.height * 1000) / 1000,
		];

		const offset = [
			(magnifyGlassElem.offsetWidth * positionRatio[0]) - (magnifyGlassElem.offsetWidth / 2),
			(magnifyGlassElem.offsetHeight * positionRatio[1]) - (magnifyGlassElem.offsetHeight / 2),
		];
		
		gsap.to(magnifyGlassElem, {
			backgroundPosition: `calc(${positionRatio[0] * 100}% - ${offset[0]}px) calc(${positionRatio[1] * 100}% - ${offset[1]}px)`,
			top: `${offsetY}px`,
			left: `${offsetX}px`,
			duration: 0
		})
	};
	
	// const handleZoom = (event) => {
	// 	event.preventDefault();
	// 	let newZoomLevel = zoomLevel;
	
	// 	if (event.deltaY < 0) {
	// 		newZoomLevel = Math.min(zoomLevel + 0.1, 1.5);
	// 	} else {
	// 		newZoomLevel = Math.max(zoomLevel - 0.1, 0.5);
	// 	}
	
	// 	setZoomLevel(newZoomLevel);
	// 	if (loupeRef.current[selected]) {
	// 		loupeRef.current[selected].style.backgroundSize = `${newZoomLevel * 100}%`;
	// 	}
	// };

	const toggleZoom = () => {
		setIsZoomActive(!isZoomActive)
		if (!loupeRef.current) return;
		
		gsap.to(loupeRef.current[selected], {
			display: 'block',
		})
	}

	const disableZoom = () => {
		setIsZoomActive(false)
		gsap.to(loupeRef.current[selected], {
			display: 'none',
		})
	}

  return (
    <>
			<div className={styles.image} data-cursor-size="0px">
					<div className='absolute top-2 left-2 z-[99999]'>
						<ButtonPrimary 
								theme='light' 
								size='small' 
								variant='lessRounded'
								text={<FiHeart className='text-[20px]'/>} 
								/>
					</div>
					<div className='absolute top-2 right-[calc(15%+0.75rem)] z-[99999]'>
						<ButtonPrimary 
								theme='light' 
								size='small' 
								variant='lessRounded'
								action={toggleZoom}
								active={isZoomActive}
								text={isZoomActive ? <FiZoomOut className='text-[20px]'/> : <FiZoomIn className='text-[20px]'/>} 
								/>
					</div>
					<div 
						className={classNames('relative flex gap-3 h-full', [styles.selectedImageContainer])}
						ref={refSelectedImageContainer}
					>
						<>
							{images.map( (image, i) => 
								<div 
									key={i}
									className={styles.imageSelected}
									ref={(el) => {
										refImageSelected.current[i] = el;
									}}
									onMouseMove={(e) => handleMouseMove(e)}
									// onWheel={handleZoom}
								>
									<div 
										ref={(el) => {
											loupeRef.current[i] = el;
										}}
										className={styles.loupe}
										style={{ backgroundImage: `url(${getImage(image)})` }}
									></div>
									<Image 
										src={getImage(image)}
										layout='fill'
										objectFit='cover'
										alt={'Reign-Of-Blood'}
										key={i}
									/>
								</div>
							)}
						</>
					</div>
					{selected < (images.length - 1) && (
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
					{selected === (images.length - 1) && (
							<button 
								onClick={() => handleSelectImage(0)}
								className={
									classNames('rotate-180 absolute left-0 h-full top-0 z-10', [styles.arrow], [styles.left])
								}
							>
								<BsChevronCompactLeft className={classNames('text-[3em] text-white', [styles.svgPrime])}/>
								<span className={styles.animatedButton}><BsChevronCompactLeft className={'text-[3em] text-white'}/></span>
							</button>
					)}
			</div>
			<div className={styles.carouselImages}>
					{images.map((image, index) => 
					<div className={classNames(selected === index && [styles.active])} onClick={() => handleSelectImage(index)} key={index}>
							<Image 
									src={getImage(image)}
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