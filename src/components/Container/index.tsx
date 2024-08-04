import { PropsWithChildren } from "react";

interface Props extends PropsWithChildren {

}

export default function Container({children}:Props) {

  return (
        <div className="w-[90%]">
            {children}
        </div>
  );
}
