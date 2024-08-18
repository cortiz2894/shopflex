'use client'

import gsap from 'gsap'
import { useGSAP } from '@gsap/react';
import { useRef } from 'react';

export default function Template({children}:{children: React.ReactNode}) {

  const loader = useRef<HTMLDivElement>(null);
  const path = useRef<SVGPathElement>(null);

  const initialCurve:number = 300;
  const duration:number = 1000;
  let start:number | undefined;

	useGSAP(() => {
		console.log('Transition')
		setPath(initialCurve)
		requestAnimationFrame(animate)
	}, [])

  const loaderHeight = () => {
    if(loader.current) {
      const loaderBounds = loader.current.getBoundingClientRect();
      return loaderBounds.height;
    }
  }

  const setPath = (curve:number) => {
    const width = window.innerWidth
    const height = loaderHeight();

    if(!path.current || !height) return

    path.current.setAttributeNS(null, "d",
    `M0 0
    L${width} 0
    L${width} ${height}
    Q${width/2} ${height - curve} 0 ${height}
    L0 0`
    )
  }

  const animate = (timestamp: number) => {
    if (start === undefined) {
      start = timestamp;
    }
  
    const elapsed = timestamp - start;
  
    if (!loader.current) return;
  
    loader.current.style.top = easeOutQuad(elapsed, 0, -(loaderHeight() as number), duration) + "px";
  
    const newCurve = easeOutQuad(elapsed, initialCurve, -400, duration);
    setPath(newCurve);
  
    if (elapsed < duration) {
      requestAnimationFrame(animate);
    }
  };

  const easeOutQuad = (time:number, start:number, end:number, duration:number) => {
    return -end * (time /= duration) * (time - 2) + start;
  }


  return (
      <div>
				<div ref={loader} className={'loader'}>
					<svg>
						{/* <path ref={path}></path> */}
						<path ref={path} fill="white" stroke="white"></path>
					</svg>
				</div>
        {children}
      </div>
  );
}
