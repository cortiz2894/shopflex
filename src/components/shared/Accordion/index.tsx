'use client'

import { useEffect, useRef, useState } from 'react'
import classNames from 'classnames'
import styles from './Accordion.module.scss'
import gsap from 'gsap'

interface Props {
  title: string,
  content: string,
  icon?: React.ReactNode
}

const Accordion = ({title, content, icon}:Props) => {
  const [active, setActive] = useState<boolean>(false)
  const contentRef = useRef<HTMLDivElement | null>(null)
  const animationRef = useRef<gsap.core.Tween | null>(null)

  useEffect(() => {
    if (contentRef.current) {
      animationRef.current = gsap.to(
        contentRef.current,
        { 
          height: 'auto', 
          ease: "power1.inOut", 
          paused: true,
          duration: 0.35
        }
      ).reverse();
    }
  }, [])

  const handleClick = () => {
    animationRef.current.reversed(!animationRef.current.reversed())
    setActive(!active)
  }

  return(
    <div className={classNames('mb-3', [styles.accordion])}>
      <div 
        className={classNames([styles.header], 'bg-white rounded-lg flex justify-between px-3 py-3 items-center')} 
        onClick={handleClick}
      >
        <div className='flex gap-3 justify-center items-center'>
          {icon}
          <p className='text-standar-darker font-semibold text-lg'>{title}</p>

        </div>
        <div className={classNames([styles.plusminus], {[styles.active]:active})}></div>
      </div>
      <div 
        className={classNames('bg-white', [styles.content])}
        ref={contentRef}
      >
        <p className='text-standar-darker p-3'>{content}</p>
      </div>
    </div>
  )
}

export default Accordion