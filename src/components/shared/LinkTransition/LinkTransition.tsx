'use client'
import Link, {LinkProps} from "next/link"
import React, { ReactNode } from "react"
import { useRouter , useParams} from "next/navigation"
import gsap from 'gsap'

interface LinkTransitionProps {
  children: ReactNode,
  href: string
}

function sleep(ms: number) {
  return new Promise((resolve)=> setTimeout(resolve, ms))
}

export const LinkTransition = ({children, href, ...props}: LinkTransitionProps) => {
  const params = useParams()
  const router = useRouter()

  const handleTransition = async (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    e.preventDefault()

    gsap.to('.exitTransition', {
      display: 'block',
      y:0,
      duration: 0.7,
      ease: "M0,0 C0.76,0 0.24,1 1,1"
    })
    
    await sleep(700)

    router.push(href)

    await sleep(200)

    gsap.timeline()
    .to('.exitTransition', {
      y:'-100vh',
      display: 'none'
    })
    .to('.exitTransition', {
      y:'100vh'
    })
  }

  return (
    <>
      <Link 
        href={href}
        onClick={handleTransition}
        {...props}
      >
        {children}
      </Link>
    </>
  )

}