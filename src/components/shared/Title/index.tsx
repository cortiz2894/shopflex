import classNames from 'classnames';
import styles from './Title.module.scss';

interface Props {
  text: string;
}

export function Title({ text }: Props) {
  return <h3 className={classNames('text-standar-darker', [styles.title])}>{text}</h3>;
}

export default Title;
