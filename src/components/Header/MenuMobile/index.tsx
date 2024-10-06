import { useRef, useState, useEffect } from 'react';
import { gsap } from 'gsap';
import Link from 'next/link';
import classNames from 'classnames';
import styles from './MobileMenu.module.scss';
import { Navlink } from '@/interfaces/navbar.interface';
import { FiChevronRight, FiChevronLeft } from "react-icons/fi";
import { CustomEase } from 'gsap/CustomEase';
import Image from 'next/image';
import { useGSAP } from '@gsap/react';

interface MobileMenuProps {
  navlinks: Navlink[]
  active: boolean
}

CustomEase.create("customEase", "0.25, 0.46, 0.45, 0.94");


const MobileMenu = ({navlinks, active}: MobileMenuProps) => {
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const menuItemsRef = useRef<HTMLLIElement[]>([]);
  const openItemSlideRef = useRef<HTMLDivElement | null>(null);
  const openItemContentRef = useRef<HTMLUListElement | null>(null);

  const [openSlide, setOpenSlide] = useState<string>('')

  const addToRefs = (el: HTMLLIElement) => {
    if (el && !menuItemsRef.current.includes(el)) {
      menuItemsRef.current.push(el);
    }
  };

  useEffect(() => {
    if (active) {
      gsap.to(mobileMenuRef.current, {
        opacity: 1,
        duration: 0.2,
        pointerEvents: 'all',
        ease: "M0,0 C0.5,0 0.5,1 1,1",
      });

      gsap.fromTo(
        menuItemsRef.current,
        { opacity: 0, y: '50%' },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: "hop",
          stagger: 0.05,
        }
      );
    } else {
      gsap.to(mobileMenuRef.current, {
        opacity: 0,
        duration: 0.5,
        pointerEvents: 'none',
      });
    }
  }, [active]);

  const selectNavlink = (selected:string) => {
    setOpenSlide(selected)
  }
  
  const selectedNavlink = navlinks.find((link) => link.title === openSlide);

  useGSAP(() => {
    if(!openItemSlideRef.current || !openItemContentRef.current) return

    if(openSlide !== '') {
      gsap.to(openItemSlideRef.current, {
        right: 0,
        duration: 0.3
      })
      gsap.to(openItemContentRef.current, {
        delay: 0.3,
        opacity: 1,
        y: 0
      })
    }

  }, [openSlide])

  const closeAnimationDropdown = () => {
    if(!openItemSlideRef.current || !openItemContentRef.current) return

    gsap.to(openItemSlideRef.current, {
      right: '-100%',
      duration: 0.2
    })
    gsap.to(openItemContentRef.current, {
      // delay: 0.3,
      opacity: 0,
      y: 25,
      onComplete: () => {
        setOpenSlide('')
      }
    })
  }

  return (
    <>
      <div
        className={classNames('p-3 pt-8', [styles.mobileNav], {[styles.activeSlide]: openSlide})}
        ref={mobileMenuRef}
      >
        <ul className={classNames('flex flex-col gap-5 w-full', [styles.containerLinks], {[styles.linkActiveSlide]: openSlide})}>
          {navlinks.map((link, index) => (
            <li
              key={index}
              ref={addToRefs}
              className={classNames('relative font-inter text-standar-darker flex w-full justify-between items-center')}
              onClick={() => selectNavlink(link.title)}
            >
              <span className={styles.mobileLink}>{link.title}</span>
              {link.dropdown && <FiChevronRight className='text-[28px] text-standar-darker'/>}
            </li>
          ))}
        </ul>
        <div ref={openItemSlideRef} className={classNames(styles.openItemSlide, {[styles.active]: openSlide}, 'p-3 pt-8')}>
          <div className='flex w-full items-center gap-2 pb-4' onClick={closeAnimationDropdown}>
            <FiChevronLeft className='text-[28px] text-standar-darker'/>
            <span className={styles.mobileLink}>{openSlide}</span>
          </div>
          <ul className='flex flex-col gap-3 translate-y-6 opacity-0' ref={openItemContentRef}>
            {selectedNavlink?.dropdown?.map((dropdownItem, index) => (
              <li key={index} className='text-standar-darker text-xl'>
                <p>{dropdownItem.title}</p>
              </li>
            ))}
          </ul>
          <div className={classNames('absolute left-0 bottom-0 p-3 w-full h-[35vh]',[styles.imageDropdown], {[styles.active]: openSlide})}>
            <Image 
              src={`/images/${selectedNavlink?.img}`}
              layout='fill'
              objectFit='cover'
              alt='clothes'
            />
            <span className='text-white text-lg absolute z-10'>{selectedNavlink?.title}</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default MobileMenu;