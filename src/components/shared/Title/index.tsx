import classNames from "classnames";
import styles from './Title.module.scss'

interface Props {
    text: string
}

export default function SectionTitle({text}:Props) {

  return <h3 className={classNames("text-standar-darker", [styles.title])}>{text}</h3>;
}
