'use client';
import Logo from '@/icons/Logo';
import gsap from 'gsap';
import { useEffect, useRef, useState } from 'react';
import classNames from 'classnames';
import { Navlink } from '@/interfaces/navbar.interface';
import { useGSAP } from '@gsap/react';
import { FiSearch, FiUser, FiShoppingCart, FiMenu } from 'react-icons/fi';
import CartDrawer from './CartDrawer';
import ButtonPrimary from '@/components/shared/ButtonPrimary';
import Counter from './CartDrawer/Counter/index';
import { CartStore, useCartStore } from '@/store/cartStore';
import shallow from 'zustand/shallow';
import Link from '../../../node_modules/next/link';
import ScrollTrigger from 'gsap/ScrollTrigger';
import styles from './Header.module.scss';
import Lenis from 'lenis';
import DropdownMenu from './DropdownMenu/index';
import { LinkTransition } from '../shared/LinkTransition/LinkTransition';
import { useLoaderStore } from '@/store/loaderStore';
import useDeviceType from '@/hooks/useDeviceType';
import MobileMenu from './MenuMobile';
import { IoCloseOutline } from 'react-icons/io5';
import { usePathname } from 'next/navigation';

const NAVLINKS = [
  {
    title: 'Men',
    img: 'shirts.avif',
    dropdown: [
      {
        title: 'Shirts',
        types: [
          {
            title: 'Oversize',
          },
          {
            title: 'Regular',
          },
          {
            title: 'Sleeveless',
          },
          {
            title: 'Long Sleeve',
          },
        ],
      },
      {
        title: 'Hoodies',
        types: [
          {
            title: 'Oversize',
          },
          {
            title: 'Regular',
          },
        ],
      },
      {
        title: 'Pants',
        types: [
          {
            title: 'Regular',
          },
          {
            title: 'Cargo',
          },
        ],
      },
      {
        title: 'Others',
      },
    ],
  },
  {
    title: 'Woman',
    img: 'woman.webp',
    dropdown: [
      {
        title: 'Shirts',
        types: [
          {
            title: 'Oversize',
          },
          {
            title: 'Regular',
          },
          {
            title: 'Sleeveless',
          },
          {
            title: 'Long Sleeve',
          },
        ],
      },
      {
        title: 'Hoodies',
        types: [
          {
            title: 'Oversize',
          },
          {
            title: 'Regular',
          },
        ],
      },
      {
        title: 'Pants',
        types: [
          {
            title: 'Regular',
          },
          {
            title: 'Cargo',
          },
        ],
      },
      {
        title: 'Others',
      },
    ],
  },
  {
    title: 'Kids',
    img: 'shirts.avif',
    dropdown: [
      {
        title: 'Shirts',
        types: [
          {
            title: 'Oversize',
          },
          {
            title: 'Regular',
          },
          {
            title: 'Sleeveless',
          },
          {
            title: 'Long Sleeve',
          },
        ],
      },
      {
        title: 'Pants',
        types: [
          {
            title: 'Regular',
          },
          {
            title: 'Cargo',
          },
        ],
      },
      {
        title: 'Others',
      },
    ],
  },
  { title: 'Accessories' },
  { title: 'About' },
  { title: 'Other' },
];

gsap.registerPlugin(ScrollTrigger);

export default function Header() {
  const [navlinks, setNavlinks] = useState<Navlink[]>(NAVLINKS);
  const isMobile = useDeviceType();
  const pathname = usePathname();

  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [showDropdown, setShowDropdown] = useState<boolean>(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [hoveredButtonIndex, setHoveredButtonIndex] = useState<number | null>(null);
  const [activeSubmenu, setActiveSubmenu] = useState<number | null>(null);
  const [mobileMenu, setMobileMenu] = useState<boolean>(false);
  const [logoWhite, setLogoWhite] = useState(isMobile);
  const isLoading = useLoaderStore((state) => state.isLoading);

  const headerRef = useRef<HTMLDivElement>(null);
  const navBarRef = useRef<HTMLDivElement>(null);
  const lenisRef = useRef<Lenis | null>(null);

  const { totals } = useCartStore(
    (state: CartStore) => ({
      totals: state.totals,
    }),
    shallow,
  );

  let tl = gsap.timeline({ paused: true });

  useEffect(() => {
    const lenis = new Lenis();
    lenisRef.current = lenis;

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    lenisRef.current.stop();

    return () => {
      lenis.destroy();
    };
  }, []);

  const toggleCart = () => {
    if (!lenisRef.current) return;

    if (isCartOpen) {
      lenisRef.current.start();
    } else {
      lenisRef.current.stop();
    }

    setIsCartOpen(!isCartOpen);
  };

  useGSAP(() => {
    if (!isLoading) {
      if (!headerRef.current || !lenisRef.current) return;

      tl.to(headerRef.current, {
        y: 0,
        ease: 'hop',
        duration: 0.5,
        delay: 0.7,
      }).to('.appear li', {
        y: 0,
        stagger: 0.1,
        opacity: 2,
        duration: 0.3,
        ease: 'hop',
      });

      lenisRef.current.start();

      tl.play();
    }
  }, [isLoading]);

  useGSAP(() => {
    if (hoveredIndex !== null) {
      gsap.killTweensOf('.dropdown-item');
      gsap.fromTo(
        '.image-dropdown',
        {
          opacity: 0,
        },
        {
          opacity: 1,
          duration: 1,
        },
      );
      gsap.to('.dropdown-item', {
        opacity: 1,
        delay: 0.1,
        x: 0,
        stagger: 0.15,
        ease: 'power4.inOut',
      });
    }
  }, [hoveredIndex]);

  useGSAP(() => {
    const showAnim = gsap
      .from(navBarRef.current, {
        yPercent: -200,
        opacity: 0,
        paused: true,
        duration: 0.2,
      })
      .progress(1);

    ScrollTrigger.create({
      start: 'top top',
      end: 'max',

      onUpdate: (self: any) => {
        if (self.direction === -1) {
          showAnim.play();
        } else {
          restartMenu();
          setShowDropdown(false);
          showAnim.reverse();
        }
      },
    });
  });

  const hoverlink = (i: number) => {
    setHoveredIndex(i);

    if (navlinks[i].dropdown) {
      setShowDropdown(true);
    } else {
      setShowDropdown(false);
      restartMenu();
    }
  };

  const restartMenu = () => {
    setHoveredIndex(null);
    setHoveredButtonIndex(null);
    setActiveSubmenu(null);
  };

  const handleMobileMenu = () => {
    if (!lenisRef.current) return;

    if (mobileMenu) {
      setMobileMenu(false);
      lenisRef.current.start();
    } else {
      lenisRef.current.stop();
      setMobileMenu(true);
    }
  };

  const backgroundChangeMobile = () => {
    setMobileMenu(false);
    setLogoWhite(true);
    gsap.to(navBarRef.current, {
      background: 'transparent',
      border: 'none',
      duration: 0.2,
    });
  };

  useEffect(() => {
    backgroundChangeMobile();

    const handleScroll = () => {
      if (isMobile && window.scrollY <= window.screen.height) {
        backgroundChangeMobile();
      } else {
        setLogoWhite(false);
        gsap.to(navBarRef.current, {
          backgroundColor: '#f9f9f9',
          borderBottom: '1px solid #ececec',
          duration: 0.3,
        });
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [pathname]);

  return (
    <>
      <header
        className={classNames('fixed left-0 top-0 translate-y-[-150%] w-full z-[999999]', [styles.header])}
        ref={headerRef}
      >
        <div className="w-full flex flex-col items-center">
          <nav
            className={classNames(
              'md:w-11/12 md:rounded md:mt-4 w-full z-10 h-16 px-3 md:px-6 py-3 overflow-hidden flex justify-center relative items-start',
              { 'bg-white !h-96': showDropdown },
              [styles.navBar],
            )}
            id="navBar"
            ref={navBarRef}
          >
            <div
              className={classNames('flex items-center justify-between w-full', styles.navbar, {
                [styles.activeMobile]: mobileMenu,
              })}
            >
              <div className="md:hidden">
                <ButtonPrimary
                  onClick={handleMobileMenu}
                  text={mobileMenu ? <IoCloseOutline className="text-[20px]" /> : <FiMenu className="text-[20px]" />}
                  variant="default"
                  size="small"
                />
              </div>
              <div className="flex items-center">
                <div
                  className={classNames('w-28 md:mr-10 text-black', { '!text-white': logoWhite && !mobileMenu })}
                  onMouseEnter={() => {
                    restartMenu();
                    setShowDropdown(false);
                  }}
                >
                  <LinkTransition href={'/'}>
                    <Logo />
                  </LinkTransition>
                </div>
                <ul className="appear overflow-hidden md:flex hidden">
                  {navlinks.map((link, index) => (
                    <li
                      key={index}
                      className={classNames('realtive font-inter text-standar-darker hover:!text-standar-darker px-2', {
                        active: hoveredIndex === index,
                      })}
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
                <div className="md:block hidden">
                  <ButtonPrimary text={<FiSearch className="text-[20px]" />} variant="default" size="small" />
                </div>
                <div className="md:block hidden">
                  <ButtonPrimary text={<FiUser className="text-[20px]" />} variant="default" size="small" />
                </div>
                <div id="cartButton" className="relative">
                  <div className="text rounded-full border border-white w-4 h-4 flex justify-center items-center bg-black z-10 p-[0.6em] absolute top-[-0.4em] right-[-0.5em]">
                    <Counter number={totals.quantity} />
                  </div>
                  <ButtonPrimary
                    action={toggleCart}
                    text={<FiShoppingCart className="text-[20px]" />}
                    variant="default"
                    size="small"
                  />
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
      <MobileMenu navlinks={navlinks} active={mobileMenu} />
      <CartDrawer isCartOpen={isCartOpen} toggleCart={toggleCart} />
    </>
  );
}
