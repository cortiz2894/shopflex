import { PropsWithChildren } from "react";

interface Props extends PropsWithChildren {

}

export default function Container({children}:Props) {

  return (
    <div className="flex justify-center my-10">
        <div className="w-[90%]">
            {children}
        </div>
    </div>
  );
}
