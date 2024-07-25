import { useRef } from 'react';
import styles from './CartDrawer.module.scss'
import classNames from "classnames";
import { IoCloseOutline } from "react-icons/io5";
import Button from '@/components/Button/index';
import ButtonPrimary from '@/components/ButtonPrimary/ButtonPrimary';
import Curve from '../Curve/index';


type CartDrawerProps = {
    isCartOpen: boolean
    toggleCart: () => void
}

export default function CartDrawer({isCartOpen, toggleCart}:CartDrawerProps) {

  return (
    <div className={classNames("h-[100vh] w-[35%] fixed z-10 top-0",[styles.drawer], {[styles.active]: isCartOpen})}>
        <div className={classNames("bg-white z-10 top-0",[styles.content], {[styles.active]: isCartOpen})}>
                <div className={classNames("absolute right-5 top-5", [styles.closeButton])} onClick={() => toggleCart()}>
                  <ButtonPrimary text={<IoCloseOutline className='text-[20px]'/>} variant='outlined' size='small'/>
                </div>
                <div className='flex'>
                </div>
        </div>
        <Curve active={isCartOpen}/>
    </div>
  );
}
