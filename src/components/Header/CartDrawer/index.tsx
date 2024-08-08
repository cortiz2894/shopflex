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

type CartDrawerProps = {
    isCartOpen: boolean
    toggleCart: () => void
}

export default function CartDrawer({isCartOpen, toggleCart}:CartDrawerProps) {

  const { products } = useCartStore((state:CartStore) => ({
    products: state.products
  }))
  const { updateQuantity } = useCartStore();
  
  return (
    <div className={classNames("h-[100vh] w-[31.5vw] fixed z-10 top-0",[styles.drawer], {[styles.active]: isCartOpen})}>
        <div className={classNames("bg-white z-10 top-0 flex flex-col",[styles.content], {[styles.active]: isCartOpen})}>
          <div className={classNames("absolute right-5 top-5", [styles.closeButton])} onClick={() => toggleCart()}>
            <ButtonPrimary text={<IoCloseOutline className='text-[20px]'/>} variant='outlined' size='small'/>
          </div>
          <div className={classNames('p-6',[styles.header])}>
            <Title text='Your bag'/>
            <span className='text-standar-darker px-2'><b>{products.length}</b>{` ${products.length <= 1 ? 'item' : 'items'}`}</span>
          </div>
          <div className='px-6 py-3 border-t border-b border-[#cdcdcd]'>
            <div className={styles.freeShippingContainer}>
              <span className=' text-standar-darker'>You’re only <b>USD53.00</b> away from FREE shipping!</span>
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
          <div className='bg-black h-52'>

          </div>
        </div>
        <Curve active={isCartOpen}/>
    </div>
  );
}
