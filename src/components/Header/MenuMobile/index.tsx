import { useRef, useState, useEffect } from 'react';
import { gsap } from 'gsap';
import Link from 'next/link';
import classNames from 'classnames';
import styles from './MobileMenu.module.scss';
import { Navlink } from '@/interfaces/navbar.interface';
import { FiChevronRight, FiChevronLeft } from "react-icons/fi";
import { CustomEase } from 'gsap/CustomEase';

interface MobileMenuProps {
  navlinks: Navlink[]
  active: boolean
}

CustomEase.create("customEase", "0.25, 0.46, 0.45, 0.94");


const MobileMenu = ({navlinks, active}: MobileMenuProps) => {
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const menuItemsRef = useRef<HTMLLIElement[]>([]);

  const [openSlide, setOpenSlide] = useState(false)

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

  return (
    <>
      <div
        className={classNames('p-3', [styles.mobileNav], {[styles.activeSlide]: openSlide})}
        ref={mobileMenuRef}
      >
        <ul className={classNames('flex flex-col gap-3 w-full', [styles.containerLinks], {[styles.linkActiveSlide]: openSlide})}>
          {navlinks.map((link, index) => (
            <li
              key={index}
              ref={addToRefs}
              className={classNames('relative font-inter text-standar-darker flex w-full justify-between items-center')}
              onClick={() => {
                setOpenSlide(true)
              }}
            >
              <span className={styles.mobileLink}>{link.title}</span>
              <FiChevronRight className='text-[28px] text-standar-darker'/>
            </li>
          ))}
        </ul>
        <div className={classNames(styles.openItemSlide, {[styles.active]: openSlide}, 'p-3')}>
          <div className='flex w-full items-center gap-2 pb-4' onClick={() => setOpenSlide(false)}>
            <FiChevronLeft className='text-[28px] text-standar-darker'/>
            <span className={styles.mobileLink}>Selected Link</span>
          </div>
          <ul className='flex flex-col gap-3'>
            <li className='text-standar-darker text-xl'>Shirts</li>
            <li className='text-standar-darker text-xl'>Pants</li>
            <li className='text-standar-darker text-xl'>Accessories</li>
            <li className='text-standar-darker text-xl'>Other</li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default MobileMenu;
