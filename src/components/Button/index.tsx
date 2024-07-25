import { useRef } from 'react';
import styles from './Button.module.scss'


type ButtonProps = {
  children: React.ReactNode
}

export default function Button({children}:ButtonProps) {
  const slider = useRef<null | HTMLDivElement>(null)

  return (
    <div className={styles.button}>
      <div className={styles.slider} ref={slider}>
        <div className={styles.el}>
          <PerspectiveText children={children}/>
        </div>
      </div>
    </div>
  );
}

type PerspectiveTextProps = {
  children: React.ReactNode
}

function PerspectiveText({children}:PerspectiveTextProps) {

  return (    
      <div className={styles.perspectiveText}>
          {children}
          {children}
      </div>
  )
}
