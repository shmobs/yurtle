import { cn } from "src/lib/utils"

function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("loading h-full w-full rounded-md", className)}
      {...props}
    />
  )
}

export { Skeleton }
