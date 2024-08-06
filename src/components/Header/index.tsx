'use client'
import Logo from "@/icons/Logo";
import Image from "next/image";
import gsap from 'gsap'
import { useState } from "react";
import classNames from "classnames";
import { navlink, navlinkDropdown } from "@/interfaces/navbar.interface";
import { useGSAP } from '@gsap/react';
import { FiSearch, FiUser, FiShoppingCart } from "react-icons/fi";
import CartDrawer from "./CartDrawer";
import ButtonPrimary from "../shared/ButtonPrimary";

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
    { title: 'Accessories' },
    { title: 'About' },
    { title: 'Other' }
];

export default function Header() {

    const [navlinks, setNavlinks] = useState<navlink[]>(NAVLINKS);
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
    const [showDropdown, setShowDropdown] = useState<boolean>(false);
    const [activeSubmenu, setActiveSubmenu] = useState<number | null>(null);

		const [isCartOpen, setIsCartOpen] = useState(false);

		const [hoveredButtonIndex, setHoveredButtonIndex] = useState<number | null>(null);
		let tl = gsap.timeline({ paused: true });

		useGSAP(() => {
			gsap.to('.appear li', {
        y: 0,
        duration: 1.2,
      });
			gsap.killTweensOf(".dropdown-item");
			if(hoveredIndex !== null) {
				gsap.fromTo('.image-dropdown', 
				{
					opacity: 0
				},
				{
					opacity: 1,
					duration: 1,
				})
				gsap.fromTo('.dropdown-item', {
					opacity: 0,
					x: -20
				},{
					opacity: 1,
					delay: 0.2,
					x: 0,
					stagger: 0.15,
					ease: "power4.inOut",
				})	
			}
		}, [hoveredIndex]);
			
		const restartMenu = () => {
			setHoveredIndex(null)
			setActiveSubmenu(null)
			setHoveredButtonIndex(null)
		}

    const hoverlink = (i: number) => {
      setHoveredIndex(i);
      if (navlinks[i].dropdown) {
        setShowDropdown(true);
				
      } else {
        setShowDropdown(false);
				restartMenu()
      }
    };
  
    const createHideSubmenuAnimation = (index: number) => {
        return gsap.timeline()
            .to(`.submenu-${index}`, {
                height: 0,
                duration: 0.2,
            })
            .to(`.submenu-${index} span`, {
                opacity: 0,
                duration: 0,
            });
    };
      
    const createShowSubmenuAnimation = (index: number) => {
        return gsap.timeline()
        .fromTo(`.submenu-${index}`, { height: 0 }, { height: 'auto', duration: 0 })
        .to(`.submenu-${index} span`, {
            y: 0,
            opacity: 1,
            stagger: 0.1,
            duration: 0.5,
        });
    };

		const handleSubmenuClick = (index: number) => {
			if (activeSubmenu !== null && activeSubmenu !== index) {
					createHideSubmenuAnimation(activeSubmenu).eventCallback("onComplete", () => {
							setActiveSubmenu(index);
							createShowSubmenuAnimation(index);
					});
					return
			}
			if (activeSubmenu === index) {
					createHideSubmenuAnimation(index).eventCallback("onComplete", () => setActiveSubmenu(null));
			} else {
					setActiveSubmenu(index);
					createShowSubmenuAnimation(index);
			}			
	};

	const toggleCart = () => {
		setIsCartOpen(!isCartOpen)
	}
  
    return (
      <header className="fixed left-0 top-0 w-full z-10">
        <div className="w-full flex flex-col items-center">
          <nav 
						className={classNames("w-11/12 z-10 rounded mt-4 px-6 py-3 overflow-hidden flex justify-center relative", {'w-full rounded-none bg-white': showDropdown})}
						style={{boxShadow: '1px 1px 5px #9898980f'}}
					>
            <div className="flex items-center justify-between navbar">
							<div className="flex items-center">
								<div className="text-black w-28 mr-10">
									<Logo />
								</div>
								<ul className="flex appear overflow-hidden">
									{navlinks.map((link, index) => (
										<li
											key={index}
											className={classNames('realtive font-inter text-standar-darker hover:!text-standar-darker px-2 text-sm', {'active': hoveredIndex === index})}
											onMouseEnter={() => hoverlink(index)}
										>
												<span>{link.title}</span>
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
								<div onClick={() => toggleCart()} id='cartButton'>
									<ButtonPrimary text={<FiShoppingCart className='text-[20px]'/>} variant='default' size='small'/>
								</div>
							</div>
							<CartDrawer isCartOpen={isCartOpen} toggleCart={toggleCart} />
            </div>
          </nav>
          <div 
            className={classNames("w-full bg-white menu-dropdown border-t border-standar-lighter z-10 flex justify-center overflow-hidden relative", {"active": showDropdown})}
            onMouseLeave={() => {
							setShowDropdown(false)
							restartMenu()
						}}
          >
						<div className="w-11/12 flex justify-between">
							<div className="w-1/2 py-5">
								<p className="text-2xl text-black mb-3">{hoveredIndex !== null && navlinks[hoveredIndex as number].title}</p>
								<ul className="pl-2 w-auto">
										{(hoveredIndex !== null && navlinks[hoveredIndex].dropdown) && navlinks[hoveredIndex].dropdown!.map((item:navlinkDropdown, index:number) => (
												<li key={index} className="dropdown-item mb-2 relative">
														<button
																className={classNames("font-inter text-standar-lighter hover:text-standar-lighter text-xl bg-none border-none", 
																{
																	'blur-text': (hoveredButtonIndex !== index && hoveredButtonIndex !== null) || (activeSubmenu !== index && activeSubmenu !== null) 
																},
																{'!text-standar-darker cancel-blur': activeSubmenu === index }
																)}
																onMouseEnter={() => setHoveredButtonIndex(index)}
																onMouseLeave={() => setHoveredButtonIndex(null)}
																onClick={() => handleSubmenuClick(index)}
														>
																{item.title}
														</button>
														<div className={`submenu submenu-${index} overflow-hidden lg:w-auto lg:absolute top-0 lg:left-[25%] z-50 flex flex-col items-start ml-10 lg:r-ml-20 gap-2 ${activeSubmenu === index ? 'active' : ''}`}>
																{item.types && item.types.map((type, typeIndex) => (
																		<span key={typeIndex} className="text-standar-darker relative">{type.title}</span>
																))}
														</div>
												</li>
										))}
								</ul>
							</div>
							<div className="h-full w-[50vw] absolute right-0 image-dropdown">
								{hoveredIndex !== null && 
									<Image 
										src={`/images/${navlinks[hoveredIndex as number].img}`}
										layout='fill'
										objectFit='cover'
										alt='clothes'
									/>
								}
							</div>
						</div>
          </div>
          <div className={classNames("overlay", {"active": showDropdown})}></div>
        </div>
      </header>
    );
  }