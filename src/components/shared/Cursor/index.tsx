import { CSSProperties, FC, useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import styles from './Cursor.module.scss';
import classNames from 'classnames';

type Props = {
  duration?: number;
  ease?: string;
};

type Size = 'small' | 'medium' | 'large';

const Cursor: FC<Props> = ({ duration = 0.3, ease = 'power3' }) => {
  const cursor = useRef<HTMLDivElement>(null);
  const [text, setText] = useState<string>('');
  const [visible, setVisible] = useState<boolean>(false);
  const [variant, setVariant] = useState<string>('default');
  const [size, setSize] = useState<Size>('medium');

  useEffect(() => {
    if (visible) {
      document.documentElement.classList.add('has-custom-cursor');
    } else {
      document.documentElement.classList.remove('has-custom-cursor');
    }
  }, [visible]);

  useEffect(() => {
    const xTo = gsap.quickTo(cursor.current, 'x', {
      duration,
      ease,
    });
    const yTo = gsap.quickTo(cursor.current, 'y', {
      duration,
      ease,
    });

    const onMouseMove = (e: MouseEvent) => {
      xTo(e.clientX);
      yTo(e.clientY);
    };

    window.addEventListener('mousemove', onMouseMove);
    return () => window.removeEventListener('mousemove', onMouseMove);
  }, [duration, ease]);

  useEffect(() => {
    const onMouseOut = () => {
      setVisible(false);
    };

    const onMouseOver = (e: MouseEvent) => {
      const element = e.target as HTMLElement;
      const cursorText = element.dataset.cursor;
      if (cursorText) {
        setText(cursorText);
        setSize(element.dataset.size as Size);
        const variant = element.dataset.cursorVariant || 'default';
        setVariant(variant);
        setVisible(true);

        gsap.fromTo(
          cursor.current,
          { scale: 0 },
          {
            scale: 1,
            duration: 0.3,
          },
        );
      }
    };

    document.addEventListener('mouseover', onMouseOver);
    document.addEventListener('mouseout', onMouseOut);

    return () => {
      document.removeEventListener('mouseover', onMouseOver);
      document.removeEventListener('mouseout', onMouseOut);
    };
  }, []);

  return (
    <div style={{ opacity: visible ? 1 : 0 }} className={styles.root}>
      <div className={classNames([styles.inner], [styles[size]])} ref={cursor} data-variant={variant}>
        {text}
      </div>
    </div>
  );
};

export default Cursor;
