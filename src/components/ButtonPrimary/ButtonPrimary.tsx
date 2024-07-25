import classNames from 'classNames'
import styles from './ButtonPrimary.module.scss';

type Props = {
    variant? : 'outlined' | 'default',
    size?: 'large' | 'small'
    text: React.ReactNode
}

export default function ButtonPrimary({variant = 'outlined', text, size = 'large'} :Props): JSX.Element {

//   const scrollToElement = () => {
//     const element = document.getElementById(text);
//     if (element) {
//       element.scrollIntoView({ behavior: 'smooth' });
//     }
//   };

  return (
    <button 
      className={classNames(styles.button, styles[variant], 'button', styles[size])} 
    //   onClick={() => scrollToElement()}
    >
        <p className={styles.text}>{text}</p>
        <div className={styles.overlay}>
            <p>{text}</p>
            <div></div>
        </div>
    </button>
  );
}