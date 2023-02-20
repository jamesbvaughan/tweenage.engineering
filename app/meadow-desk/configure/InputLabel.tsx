import classNames from "classnames";
import { ComponentProps } from "react";

const InputLabel = ({ className, ...labelProps }: ComponentProps<"label">) => {
  return (
    <label {...labelProps} className={classNames("text-gray-500", className)} />
  );
};

export default InputLabel;
