'use client';
import React, { useState } from 'react';
import Counter from '@/components/Header/CartDrawer/Counter/index';
import ButtonPrimary from '@/components/shared/ButtonPrimary/index';
import { AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai';
import styles from './QuantityCuonter.module.scss';

const QuantityCounter = () => {
  const [quantity, setQuantity] = useState(1);

  const addQuantity = () => {
    setQuantity(quantity + 1);
  };

  const restQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  return (
    <div className="flex justify-center items-center gap-2">
      <ButtonPrimary
        theme="dark"
        size="small"
        variant="lessRounded"
        text={<AiOutlineMinus className="text-[20px]" />}
        action={restQuantity}
      />
      <div className={styles.counter}>
        <Counter number={quantity} />
      </div>
      <ButtonPrimary
        theme="dark"
        size="small"
        variant="lessRounded"
        action={addQuantity}
        text={<AiOutlinePlus className="text-[20px]" />}
      />
    </div>
  );
};

export default QuantityCounter;
