import classNames from 'classnames';
import { PropsWithChildren } from 'react';

interface Props extends PropsWithChildren {
  mobileFullWidth?: boolean;
}

export default function Container({ children, mobileFullWidth }: Props) {
  return (
    <div className={classNames('flex justify-center my-5 md:my-10 w-full z-10 ', { 'mt-0 md:mt-5': mobileFullWidth })}>
      <div className={classNames('w-[90%]', { 'w-full md:w-[90%]': mobileFullWidth })}>{children}</div>
    </div>
  );
}
