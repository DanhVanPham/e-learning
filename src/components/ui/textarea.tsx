import * as React from "react";

import { cn } from "@/lib/utils";

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        className={cn(
          ` flex min-h-20 resize-none outline-none rounded-md font-medium p-3 w-full text-sm border border-gray-200 focus:!border-primary
           transition-all dark:border-opacity-10 bg-white dark:bg-grayDark
           `,
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Textarea.displayName = "Textarea";

export { Textarea };
