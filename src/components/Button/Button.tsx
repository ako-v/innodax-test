import clsx from "clsx";
import { HTMLAttributes } from "react";

export type ButtonProps = HTMLAttributes<HTMLButtonElement>;

const Button = (props: ButtonProps) => {
  const { children, className, ...rest } = props;
  return (
    <button
      className={clsx("text-white bg-blue-600 hover:bg-blue-700 font-medium rounded-sm text-sm flex items-center justify-center px-2", className)}
      {...rest}
    >
      {children}
    </button>
  );
};
export default Button;
