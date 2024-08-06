import { useRef } from 'react';
import styles from './CartDrawer.module.scss'
import classNames from "classnames";
import { IoCloseOutline } from "react-icons/io5";
import ButtonPrimary from '@/components/shared/ButtonPrimary';
import Curve from '../Curve/index';
import Title from '@/components/shared/Title'

type CartDrawerProps = {
    isCartOpen: boolean
    toggleCart: () => void
}

export default function CartDrawer({isCartOpen, toggleCart}:CartDrawerProps) {


  return (
    <div className={classNames("h-[100vh] w-[31.5vw] fixed z-10 top-0",[styles.drawer], {[styles.active]: isCartOpen})}>
        <div className={classNames("bg-white z-10 top-0",[styles.content], {[styles.active]: isCartOpen})}>
          <div className={classNames("absolute right-5 top-5", [styles.closeButton])} onClick={() => toggleCart()}>
            <ButtonPrimary text={<IoCloseOutline className='text-[20px]'/>} variant='outlined' size='small'/>
          </div>
          <div className={classNames('p-6',[styles.header])}>
            <Title text='Your bag'/>
          </div>
          <div className='px-6 py-3 border-t border-b border-[#cdcdcd]'>
            <div className={styles.freeShippingContainer}>
              <span className=' text-standar-darker'>You’re only <b>USD53.00</b> away from FREE shipping!</span>
              <div className='w-full rounded-3xl bg-[#cdcdcd] relative h-5 mt-3'>
                <div className='absolute h-full bg-black rounded-3xl w-1/2'></div>
              </div>
            </div>
          </div>
        </div>
        <Curve active={isCartOpen}/>
    </div>
  );
}
