import * as React from "react";
import { cn } from "cn";


/**
 * Max-width content wrapper used across all sections/pages so spacing stays
 * consistent site-wide. Adjust `max-w-6xl` here to change the global content
 * width in one place.
 */
function Container({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn("mx-auto w-full max-w-6xl px-6 lg:px-8", className)}
      {...props}
    />
  );
}

export { Container };
