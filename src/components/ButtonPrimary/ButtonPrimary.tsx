import classNames from "classnames";
import styles from './ButtonPrimary.module.scss';

type Props = {
    variant? : 'outlined' | 'default' | 'lessRounded',
    theme? : 'light' | 'dark',
    size?: 'large' | 'small' | 'full'
    text: React.ReactNode
}

export default function ButtonPrimary({variant = 'outlined', text, size = 'large', theme = 'light'} :Props): JSX.Element {

//   const scrollToElement = () => {
//     const element = document.getElementById(text);
//     if (element) {
//       element.scrollIntoView({ behavior: 'smooth' });
//     }
//   };

  return (
    <button 
      className={classNames(styles.button, styles[variant], 'button', styles[size], styles[theme])} 
    >
        <p className={styles.text}>{text}</p>
        <div className={styles.overlay}>
            <p>{text}</p>
            <div></div>
        </div>
    </button>
  );
}