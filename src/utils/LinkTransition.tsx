import Link, {LinkProps} from "next/link"
import { ReactNode } from "react"

interface LinkTransitionProps {
  children: ReactNode,
  href: string
}

export const LinkTransition = ({children, href, ...props}: LinkTransitionProps) => {

  return (
    <Link 
      href={href}
      {...props}
    >
      {children}
    </Link>
  )

}