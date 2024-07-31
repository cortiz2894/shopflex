import { useRef } from 'react';
import styles from './ProductCard.module.scss'
import classNames from "classnames";
import Image from "next/image";

type Props = {
}

export default function ProductCard({}:Props) {

  return (
    <div className={classNames('w-1/4 h-[650px] relative', [styles.card])}>
      <div className='relative h-[60%]'>
        <div className={styles.imageContainer}>
          <Image 
            src={`/images/gorra.png`}
            width={500} height={500} objectFit="none"
            alt='clothes'
          />
        </div>
      </div>
      <div className='flex justify-between bottom-0 px-6 py-3'>
        <p className='text-2xl text-standar-darker max-w-[70%] text-ellipsis whitespace-nowrap overflow-hidden'>Baseball cap</p>
        <span className='text-xl uppercase text-standar-darker font-semibold'>$ 44.9</span>
      </div>
    </div>
  );
}
