import React, {ReactNode} from "react";

type ContainerProps = {
  children?: ReactNode;
  className?: string;
};

export const Container: React.FC<ContainerProps> = ({className, children}) => {
  return (
    <div
      className={`min-h-[100vh] max-w-[1024px] m-auto w-100 ${
        className ? className : ""
      }`}
    >
      {children}
    </div>
  );
};
