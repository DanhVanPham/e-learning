import { ForwardedRef, forwardRef } from "react";
import {
  InputAttributes,
  NumericFormat,
  NumericFormatProps,
} from "react-number-format";

const InputFormatCurrency = forwardRef(
  (props: NumericFormatProps<InputAttributes>, ref: any) => {
    return (
      <div ref={ref}>
        <NumericFormat
          className="flex outline-none h-10 rounded-md font-medium px-3 w-full text-sm border border-gray-200 focus:!border-primary transition-all dark:border-opacity-10 bg-white dark:bg-grayDarker  focus-primary"
          thousandSeparator
          {...props}
        />
      </div>
    );
  }
);

InputFormatCurrency.displayName = "InputFormatCurrency";

export default InputFormatCurrency;
