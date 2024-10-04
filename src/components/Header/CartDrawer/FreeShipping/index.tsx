import classNames from 'classnames';
import styles from './FreeShipping.module.scss';

const FREE_SHIPPING = 200;

export const FreeShipping = ({ totalPrice }: { totalPrice: number }) => {
  const calculatePercent = (totalPrice: number) => {
    return (totalPrice / FREE_SHIPPING) * 100;
  };

  return (
    <div className={styles.freeShippingContainer}>
      {calculatePercent(totalPrice) < 100 ? (
        <span className="text-sm text-center text-standar-darker">
          You’re only <b>{`USD ${FREE_SHIPPING - totalPrice}`}</b> away from FREE shipping!
        </span>
      ) : (
        <span className="text-sm text-center text-standar-darker font-semibold">You have FREE SHIPPING!</span>
      )}
      <div className="w-full rounded-3xl bg-[#cdcdcd] relative h-5 mt-3">
        <div
          className={classNames('absolute h-full bg-black rounded-3xl', styles.progress)}
          style={{
            width: `${calculatePercent(totalPrice)}%`,
          }}
        ></div>
      </div>
    </div>
  );
};
