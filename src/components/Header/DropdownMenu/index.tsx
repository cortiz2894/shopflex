'use client'
import Image from "next/image";
import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import classNames from "classnames";
import Link from "next/link";
import ScrollTrigger from "gsap/ScrollTrigger";
import styles from './DropdownMenu.module.scss'
import gsap from 'gsap'
import { Navlink, NavlinkDropdown } from "@/interfaces/navbar.interface";

type Props = {
	restartMenu: () => void
  hoveredIndex: number | null
  navlinks: Navlink[]
  setShowDropdown: (value: SetStateAction<boolean>) => void
  showDropdown: boolean
  setHoveredButtonIndex: Dispatch<SetStateAction<number | null>>
  hoveredButtonIndex: number | null
}

export default function DropdownMenu({restartMenu, hoveredIndex, navlinks, showDropdown, setShowDropdown, setHoveredButtonIndex, hoveredButtonIndex}:Props) {

  const [activeSubmenu, setActiveSubmenu] = useState<number | null>(null);

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
        duration: 0.3,
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
    return (
			<>
        <div 
          className={classNames("w-11/12 rounded bg-transparent menu-dropdown z-10 flex justify-center overflow-hidden relative", {"active": showDropdown})}
          onMouseLeave={() => {
            setShowDropdown(false)
            restartMenu()
          }}
        >
          <div className="w-11/12 flex justify-between">
            <div className="w-1/2 py-5">
              <p className="text-2xl text-black mb-3">{hoveredIndex !== null && navlinks[hoveredIndex as number].title}</p>
              <ul className="pl-2 w-auto">
                  {(hoveredIndex !== null && navlinks[hoveredIndex].dropdown) && navlinks[hoveredIndex].dropdown!.map((item:NavlinkDropdown, index:number) => (
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
			</>
    );
  }