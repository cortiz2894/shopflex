'use client'
import Logo from "@/icons/Logo";
import gsap from 'gsap'
import { useEffect, useRef, useState } from "react";
import classNames from "classnames";
import { Navlink } from "@/interfaces/navbar.interface";
import { useGSAP } from '@gsap/react';
import { FiSearch, FiUser, FiShoppingCart } from "react-icons/fi";
import CartDrawer from "./CartDrawer";
import ButtonPrimary from "@/components/shared/ButtonPrimary";
import Counter from "./CartDrawer/Counter/index";
import { CartStore, useCartStore } from "@/store/cartStore";
import shallow from 'zustand/shallow';
import Link from "../../../node_modules/next/link";
import ScrollTrigger from "gsap/ScrollTrigger";
import styles from './Header.module.scss'
import Lenis from 'lenis'
import DropdownMenu from "./DropdownMenu/index";
import { LinkTransition } from "../shared/LinkTransition/LinkTransition";
import { useLoaderStore } from "@/store/loaderStore";

const NAVLINKS = [
    { 
        title: 'Men',
				img: 'shirts.avif',
        dropdown: [
            {
                title: 'Shirts',
                types: [
                    {
                        title: 'Oversize'
                    },
                    {
                        title: 'Regular'
                    },
                    {
                        title: 'Sleeveless'
                    },
                    {
                        title: 'Long Sleeve'
                    }
                ]
            },
						{
							title: 'Hoodies',
							types: [
									{
											title: 'Oversize'
									},
									{
											title: 'Regular'
									}
							]
						},
						{
							title: 'Pants',
							types: [
									{
											title: 'Regular'
									},
									{
											title: 'Cargo'
									}
							]
						},
						{
							title: 'Others',
						},
        ]
    },
		{ title: 'Woman',
			img: 'woman.webp',
			dropdown: [
				{
						title: 'Shirts',
						types: [
								{
										title: 'Oversize'
								},
								{
										title: 'Regular'
								},
								{
										title: 'Sleeveless'
								},
								{
										title: 'Long Sleeve'
								}
						]
				},
				{
					title: 'Hoodies',
					types: [
							{
									title: 'Oversize'
							},
							{
									title: 'Regular'
							}
					]
				},
				{
					title: 'Pants',
					types: [
							{
									title: 'Regular'
							},
							{
									title: 'Cargo'
							}
					]
				},
				{
					title: 'Others',
				},
		] },
    { title: 'Kids',
			img: 'shirts.avif',
			dropdown: [
				{
						title: 'Shirts',
						types: [
								{
										title: 'Oversize'
								},
								{
										title: 'Regular'
								},
								{
										title: 'Sleeveless'
								},
								{
										title: 'Long Sleeve'
								}
						]
				},
				{
					title: 'Pants',
					types: [
							{
									title: 'Regular'
							},
							{
									title: 'Cargo'
							}
					]
				},
				{
					title: 'Others',
				},
		] },
    { title: 'Accessories' },
    { title: 'About' },
    { title: 'Other' }
];

gsap.registerPlugin(ScrollTrigger);

export default function Header() {

    const [navlinks, setNavlinks] = useState<Navlink[]>(NAVLINKS);
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
    const [showDropdown, setShowDropdown] = useState<boolean>(false);
		const [isCartOpen, setIsCartOpen] = useState(false);
		const [hoveredButtonIndex, setHoveredButtonIndex] = useState<number | null>(null);
		const [activeSubmenu, setActiveSubmenu] = useState<number | null>(null);
		const isLoading = useLoaderStore((state) => state.isLoading);

		const headerRef = useRef<HTMLDivElement>(null)
		const navBarRef = useRef<HTMLDivElement>(null)
		const lenisRef = useRef<Lenis | null>(null);

		const { totals } = useCartStore((state:CartStore) => ({
			totals : state.totals
		}), shallow)

		let tl = gsap.timeline({ paused: true });

  useEffect(() => {
    const lenis = new Lenis();
    lenisRef.current = lenis;

    function raf(time:number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

		lenisRef.current.stop()

    return () => {
      lenis.destroy();
    };
  }, []);

  const toggleCart = () => {
		if(!lenisRef.current) return 
		
    if (isCartOpen) {
			lenisRef.current.start();
    } else {
      lenisRef.current.stop();
    }

    setIsCartOpen(!isCartOpen);
  };
		
		useGSAP(() => {
			if(!isLoading) {
				
				if(!headerRef.current || !lenisRef.current) return

				tl.to(headerRef.current, {
					y:0,
					ease: 'hop',
					duration: 0.5,
					delay: 0.7
				})
				.to('.appear li', {
					y: 0,
					stagger: 0.1,
					opacity: 2,
					duration: 0.3,
					ease: "hop",
				});

				lenisRef.current.start()

				tl.play()
			}
		}, [isLoading]);

		useGSAP(() => {
			if(hoveredIndex !== null) {
				gsap.killTweensOf(".dropdown-item");
				gsap.fromTo('.image-dropdown', 
				{
					opacity: 0
				},
				{
					opacity: 1,
					duration: 1,
				})
				gsap.to('.dropdown-item', {
					opacity: 1,
					delay: 0.1,
					x: 0,
					stagger: 0.15,
					ease: "power4.inOut",
				})	
			}
		}, [hoveredIndex]);

		useGSAP(() => {
			const showAnim = gsap.from(navBarRef.current , { 
				yPercent: -200,
				opacity: 0,
				paused: true,
				duration: 0.2
			}).progress(1);

			ScrollTrigger.create({
				start: "top top",
				end: "max",
				
				onUpdate: (self:any) => {
					if(self.direction === -1) {
						showAnim.play() 
					}
					else {
						restartMenu()
						setShowDropdown(false);
						showAnim.reverse()
					} 
				}
			});
		})

    const hoverlink = (i: number) => {
      setHoveredIndex(i);
			
      if (navlinks[i].dropdown) {
        setShowDropdown(true);
      } else {
        setShowDropdown(false);
				restartMenu()
      }
    };

		const restartMenu = () => {
			setHoveredIndex(null)
			setHoveredButtonIndex(null)
			setActiveSubmenu(null)
		}
    return (
			<>
				<header className="fixed left-0 top-0 translate-y-[-150%] w-full z-[999999]" ref={headerRef}>
					<div className="w-full flex flex-col items-center">
						<nav 
							className={
								classNames(
									"w-11/12 z-10 h-16 rounded mt-4 px-6 py-3 overflow-hidden flex justify-center relative items-start",
								 {'bg-white !h-96': showDropdown},
								 [styles.navBar]
								 )}
							id='navBar'
							style={{boxShadow: '1px 1px 5px #9898980f'}}
							ref={navBarRef}
						>
							<div className="flex items-center justify-between navbar">
								<div className="flex items-center">
									<div 
										className="text-black w-28 mr-10"
										onMouseEnter={() => {
											restartMenu()
											setShowDropdown(false);
										}}
									>
										<LinkTransition href={'/'}>
											<Logo />
										</LinkTransition>
									</div>
									<ul className="flex appear overflow-hidden">
										{navlinks.map((link, index) => (
											<li
												key={index}
												className={classNames('realtive font-inter text-standar-darker hover:!text-standar-darker px-2', {'active': hoveredIndex === index})}
												onMouseEnter={() => hoverlink(index)}
											>
													<Link href={'/product'}>
														<span className={styles.navLink}>{link.title}</span>
													</Link>
											</li>
										))}
									</ul>

								</div>
								<div className="flex gap-2">
									<div>
										<ButtonPrimary text={<FiSearch className='text-[20px]'/>} variant='default' size='small'/>
									</div>
									<div>
										<ButtonPrimary text={<FiUser className='text-[20px]'/>} variant='default' size='small'/>
									</div>
									<div id='cartButton' className="relative">
										<div className='text rounded-full border border-white w-4 h-4 flex justify-center items-center bg-black z-10 p-[0.6em] absolute top-[-0.4em] right-[-0.5em]'>
											<Counter number={totals.quantity} />
										</div>
										<ButtonPrimary action={toggleCart} text={<FiShoppingCart className='text-[20px]'/>} variant='default' size='small'/>
									</div>
								</div>
							</div>
						</nav>
						<DropdownMenu 
							restartMenu={restartMenu} 
							hoveredIndex={hoveredIndex} 
							showDropdown={showDropdown} 
							setShowDropdown={setShowDropdown}
							hoveredButtonIndex={hoveredButtonIndex}
							setHoveredButtonIndex={setHoveredButtonIndex}
							navlinks={navlinks}
							setActiveSubmenu={setActiveSubmenu}
							activeSubmenu={activeSubmenu}
						/>
					</div>
				</header>
				<CartDrawer isCartOpen={isCartOpen} toggleCart={toggleCart} />
			</>
    );
  }