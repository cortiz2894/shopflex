import { useRef } from 'react';
import styles from './CartDrawer.module.scss'
import classNames from "classnames";
import { IoCloseOutline } from "react-icons/io5";
import ButtonPrimary from '@/components/shared/ButtonPrimary';
import Curve from '../Curve/index';
import Title from '@/components/shared/Title'
import { CartStore, Product, useCartStore } from '@/store/cartStore';
import Image from 'next/image';
import Counter from './Counter/index';
import { AiOutlineLock } from "react-icons/ai";

type CartDrawerProps = {
    isCartOpen: boolean
    toggleCart: () => void
}

export default function CartDrawer({isCartOpen, toggleCart}:CartDrawerProps) {

  const { products, totals } = useCartStore((state:CartStore) => ({
    products: state.products,
    totals: state.totals
  }))
  const { updateQuantity } = useCartStore();

  return (
    <div className={classNames("h-[100vh] w-[31.5vw] fixed z-10 top-0",[styles.drawer], {[styles.active]: isCartOpen})}>
      <Curve active={isCartOpen}/>
        <div className={classNames("bg-white z-10 top-0 flex flex-col",[styles.content], {[styles.active]: isCartOpen})}>
          <div className={classNames("absolute right-5 top-5", [styles.closeButton])} onClick={() => toggleCart()}>
            <ButtonPrimary text={<IoCloseOutline className='text-[20px]'/>} variant='outlined' size='small'/>
          </div>
          <div className={classNames('p-6',[styles.header])}>
            <Title text='Your bag'/>
            <span className='text-standar-darker px-2'><b>{totals.quantity}</b>{` ${totals.quantity <= 1 ? 'item' : 'items'}`}</span>
          </div>
          <div className='px-6 py-3 border-t border-b border-[#cdcdcd]'>
            <div className={styles.freeShippingContainer}>
              <span className='text-sm text-center text-standar-darker'>You’re only <b>USD53.00</b> away from FREE shipping!</span>
              <div className='w-full rounded-3xl bg-[#cdcdcd] relative h-5 mt-3'>
                <div className='absolute h-full bg-black rounded-3xl w-1/2'></div>
              </div>
            </div>
          </div>
          <div className='px-6 py-3 flex flex-col gap-3 h-full overflow-y-auto'>
            {products.length === 0 && <p className='text-standar-darker flex justify-center h-full items-center'>Your Cart is Empty</p>}
            {products.map((prod:Product) => (
              <div key={prod.id} className={classNames('px-3 py-4 gap-3',[styles.product])}>
                <div className={styles.imageContainer}>
                  <Image 
                    src={`/images/${prod.image}`}
                    width={500} height={500} objectFit="none"
                    alt='clothes'
                  />
                </div>
                <div className='w-3/4 flex flex-col justify-around'>
                  <p className='text-standar-darker font-bold mb-2 text-sm'>{prod.title}</p>
                  <p className='text-standar-darker mb-2 text-sm'>USD {prod.price}</p>
                  <div>
                    <div className={styles.productCounter}>
                      <button onClick={() => updateQuantity(prod.id, false)}>-</button>
                        <Counter number={prod.quantity}/>
                      <button onClick={() => updateQuantity(prod.id, true)}>+</button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          {products.length > 0 && (
            <div className='bg-black p-6'>
              <div className='flex justify-between w-full mb-2'>
                <h3 className='text-white text-3xl'>
                  Total
                </h3>
                <h3 className='text-white text-2xl'>
                  <b>{totals.price}usd</b>
                </h3>
              </div>
              <span className='text-white'>Shipping calculated at checkout</span>
              <div className='mt-3'>
                <ButtonPrimary 
                    action={() => console.log()} 
                    theme='light' 
                    variant='lessRounded' 
                    size='full'
                    text={
                      <span className={'flex relative'}>Checkout<AiOutlineLock className='text-[20px] ml-2'/></span>
                    } 
                  />

              </div>
            </div>
          )}
        </div>
    </div>
  );
}
