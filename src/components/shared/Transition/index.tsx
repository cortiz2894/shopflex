'use client'
import Logo from '@/icons/Logo'
import React, { useState } from 'react'

export default function Transition({children}) {
	const [displayChildren, setDisplayChildren] = useState(children)
	// console.log('children: ', children)
  return (
    <div>
			{displayChildren}
    </div>
  )
}