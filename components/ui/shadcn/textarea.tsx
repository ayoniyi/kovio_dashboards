import * as React from "react"

import { cn } from "@/lib/utils"

const Textarea = React.forwardRef<
  HTMLTextAreaElement,
  React.ComponentProps<"textarea">
>(({ className, ...props }, ref) => {
  return (<>
    
    {/* <label className="text-left ml-0 flex text-kv-venue-header text-sm leading-5 " htmlFor="textarea">Reason</label> */}
    <textarea id="textarea" placeholder="Enter text here..."
      className={cn(
        "flex min-h-[60px] w-full mt-3 rounded-3xl  h-20 border border-[#CBD5E1] bg-transparent px-3 py-2 text-base shadow-sm placeholder:text-muted-foreground outline-none  md:text-sm",
        className
      )}
      ref={ref}
      {...props}
    />
  </>)
})
Textarea.displayName = "Textarea"

export { Textarea }
