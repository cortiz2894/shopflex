'use client'

import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { useRef } from 'react';

export default function Template({children}:{children: React.ReactNode}) {

  const loader = useRef<HTMLDivElement>(null);
  const path = useRef<SVGPathElement>(null);

  const initialCurve:number = 300;
  const duration:number = 0.8; // Duración más corta

  useGSAP(() => {
    setPath(initialCurve);
    
    gsap.timeline()
    .to('.exitTransition', {
      y:'-100vh',
      display: 'none'
    })
    .to('.exitTransition', {
      y:'100vh'
    })

    if (loader.current) {
      gsap.to(loader.current, {
        y: -(loaderHeight() as number),
        duration: duration,
        ease: "M0,0 C0.5,0 0.5,1 1,1", // Curva de Bézier ajustada
        onUpdate: () => {
          const progress = gsap.getProperty(loader.current, "progress") as number;
          const newCurve = gsap.utils.interpolate(initialCurve, -100, progress);
          setPath(newCurve);
        }
      });
    }
  }, []);

  const loaderHeight = () => {
    if(loader.current) {
      const loaderBounds = loader.current.getBoundingClientRect();
      return loaderBounds.height;
    }
  };

  const setPath = (curve:number) => {
    const width = window.innerWidth;
    const height = loaderHeight();

    if(!path.current || !height) return;

    path.current.setAttributeNS(null, "d",
    `M0 0
    L${width} 0
    L${width} ${height}
    Q${width/2} ${height - curve} 0 ${height}
    L0 0`
    );
  };

  return (
      <div>
        <div ref={loader} className={'loader'}>
          <svg>
            <path ref={path} fill="white" stroke="white"></path>
          </svg>
        </div>
        {children}
      </div>
  );
}
